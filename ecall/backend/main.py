import os
import json
import requests
import network_as_code as nac

print(os.getcwd())  # For debugging current working directory

# We initialize the client object with your application key
client = nac.NetworkAsCodeClient(
    token = "e6988a47acmsh6730dcd750e7cecp12ccebjsn097e655f1132"
)

# Create a device object for the mobile device we want to use
my_device = client.devices.get(
    "device@testcsp.net",
    
    # The phone number does not accept spaces or parentheses
    phone_number="+17757729258"
)

# Location is retrieved using API call
location = my_device.location(max_age=60)

# Set location to Indonesia due to functionality still being built
# Jakarta Indonesia
location.latitude = -6.200000
location.longitude = 106.816666

# Beijing China
location.latitude = 39.9042
location.longitude = 116.4074

# Seattle, USA
location.latitude = 47.6062
location.longitude = -122.3321

api_key = "AIzaSyAgfKGbMWB13Dpth5lKIf1eeyin-szXtyE"

# Define the URL for the Google Geocoding API
url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={location.latitude},{location.longitude}&key={api_key}"

# Make the request to the API
response = requests.get(url)

# Parse the response JSON
data = response.json()

# Initialize variables to store city and country
city = ""
country = ""

# Check if the API request was successful
if response.status_code == 200 and data['status'] == 'OK':
    # Extract the formatted address and country from the response
    results = data['results']
    if results:
        # Loop through the address components to find the city and country
        for component in results[0]['address_components']:
            if 'locality' in component['types']:  # Check for city
                city = component['long_name']
            elif 'administrative_area_level_2' in component['types']:  # Fallback for city (in some cases)
                city = component['long_name']
            elif 'postal_town' in component['types']:  # Another fallback for city in some countries
                city = component['long_name']
            if 'country' in component['types']:  # Check for country
                country = component['long_name']

# Now, the variables `city` and `country` will hold the respective values.
print(f"City: {city}")
print(f"Country: {country}")

# Use dynamic path to load the JSON data from the file relative to the script location
current_directory = os.path.dirname(__file__)
file_path = os.path.join(current_directory, 'emergency_numbers.json')

# Load the JSON data from the file
with open(file_path, 'r') as file:
    emergency_data = json.load(file)

# Function to get the emergency number by priority: Dispatch > Police > Ambulance > Fire
def get_best_emergency_number(country_data):
    # Check for Dispatch number
    dispatch_numbers = country_data.get('Dispatch', {}).get('All', [])
    if dispatch_numbers and dispatch_numbers[0]:
        return dispatch_numbers[0]  # Return the Dispatch number if available
    
    # Check for Police number
    police_numbers = country_data.get('Police', {}).get('All', [])
    if police_numbers and police_numbers[0]:
        return police_numbers[0]  # Return the Police number if available
    
    # Check for Ambulance number
    ambulance_numbers = country_data.get('Ambulance', {}).get('All', [])
    if ambulance_numbers and ambulance_numbers[0]:
        return ambulance_numbers[0]  # Return the Ambulance number if available
    
    # Check for Fire number
    fire_numbers = country_data.get('Fire', {}).get('All', [])
    if fire_numbers and fire_numbers[0]:
        return fire_numbers[0]  # Return the Fire number if available
    
    return None  # Return None if no emergency number found

# Query by country
def get_emergency_numbers_by_country(country_name):
    for country in emergency_data:
        if country['Country']['Name'].lower() == country_name.lower():
            return country

# Example usage
country_name = country
country_data = get_emergency_numbers_by_country(country_name)

if country_data:
    best_number = get_best_emergency_number(country_data)
    print(f"Best emergency number for {country_name}: {best_number}")
else:
    print(f"No emergency data found for {country_name}")
