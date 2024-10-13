import network_as_code as nac
import requests

from network_as_code.models.device import DeviceIpv4Addr

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
location.latitude = -6.200000
location.longitude = 106.816666

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
# You can use these variables as needed and print them.
print(f"City: {city}")
print(f"Country: {country}")
