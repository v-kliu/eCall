import os
import json
import requests
import network_as_code as nac
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from twilio_routes import router as twilio_router

# Load environment variables from the .env file
load_dotenv()

app = FastAPI()

# Allowed origins for your frontend (both local and production URLs)
origins = [
    "http://localhost:3000",  # Allow local development frontend
    "https://e-call.vercel.app",  # Allow Vercel or other deployed frontend
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, or specify specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include the Twilio router from twilio.py
app.include_router(twilio_router)

@app.get("/data")
def get_data():
    return {"city": city, "country": country_name, "number": best_number}

# Initialize the client object with your application key
client = nac.NetworkAsCodeClient(
    token=os.getenv('NETWORK_AS_CODE_API_KEY')
)

# Create a device object for the mobile device
my_device = client.devices.get(
    "device@testcsp.net",
    phone_number="+17757729258"  # No spaces or parentheses allowed in phone number
)

# Get location using API call
location = my_device.location(max_age=60)
location.latitude = -6.200000  # Jakarta, Indonesia
location.longitude = 106.816666

api_key = os.getenv('GOOGLE_CLOUD_CONSOLE_API_KEY')

# Google Geocoding API request
url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={location.latitude},{location.longitude}&key={api_key}"
response = requests.get(url)
data = response.json()

city = ""
country = ""

# Parse the API response
if response.status_code == 200 and data['status'] == 'OK':
    plus_code = data.get('plus_code', {}).get('compound_code', '')
    if plus_code:
        parts = plus_code.split(',')
        country = parts[-1].strip()  # Last part is the country
        city_parts = parts[-2].split()  # Remove numbers from city name
        city = ' '.join([part for part in city_parts if not any(char.isdigit() for char in part)]).strip()

print(f"City: {city}")
print(f"Country: {country}")

# Load emergency numbers JSON file
current_directory = os.path.dirname(__file__)
file_path = os.path.join(current_directory, 'emergency_numbers.json')
with open(file_path, 'r') as file:
    emergency_data = json.load(file)

# Function to get emergency number by priority
def get_best_emergency_number(country_data):
    dispatch_numbers = country_data.get('Dispatch', {}).get('All', [])
    if dispatch_numbers and dispatch_numbers[0]:
        return dispatch_numbers[0]
    police_numbers = country_data.get('Police', {}).get('All', [])
    if police_numbers and police_numbers[0]:
        return police_numbers[0]
    ambulance_numbers = country_data.get('Ambulance', {}).get('All', [])
    if ambulance_numbers and ambulance_numbers[0]:
        return ambulance_numbers[0]
    fire_numbers = country_data.get('Fire', {}).get('All', [])
    if fire_numbers and fire_numbers[0]:
        return fire_numbers[0]
    return None

# Function to get emergency numbers by country
def get_emergency_numbers_by_country(country_name):
    for country in emergency_data:
        if country['Country']['Name'].lower() == country_name.lower():
            return country

# Get best emergency number for the identified country
country_name = country
country_data = get_emergency_numbers_by_country(country_name)
if country_data:
    best_number = get_best_emergency_number(country_data)
    print(f"Best emergency number for {country_name}: {best_number}")
else:
    print(f"No emergency data found for {country_name}")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
