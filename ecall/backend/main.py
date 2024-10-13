import os
import json
import requests
import network_as_code as nac

# print(os.getcwd())  # For debugging current working directory

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

# London, UK
location.latitude = 51.5074
location.longitude = -0.1278

# Johannesburg, South Africa
location.latitude = -26.2041
location.longitude = 28.0473

# Dublin, Ireland
location.latitude = 53.3498
location.longitude = -6.2603

# Manchester, UK
location.latitude = 53.4808
location.longitude = -2.2426

# Berlin, Germany
location.latitude = 52.5200
location.longitude = 13.4050

# Seoul, South Korea
location.latitude = 37.5665
location.longitude = 126.9780

# Auckland, New Zealand
location.latitude = -36.8485
location.longitude = 174.7633

# Jerusalem, Israel
location.latitude = 31.7683
location.longitude = 35.2137

# Moscow, Russia
location.latitude = 55.7558
location.longitude = 37.6173

# Saigon, Vietnam
# location.latitude = 10.8231
# location.longitude = 106.6297

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
    # Extract the compound_code from plus_code
    plus_code = data.get('plus_code', {}).get('compound_code', '')

    if plus_code:
        # Split the compound_code by commas to extract city and country
        parts = plus_code.split(',')

        # Country is the last part
        country = parts[-1].strip()  # Last part

        # For city, remove parts with numbers
        city_parts = parts[-2].split()  # Split by space
        city = ' '.join([part for part in city_parts if not any(char.isdigit() for char in part)]).strip() # Removes digits

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
