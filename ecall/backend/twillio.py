import os
from twilio.rest import Client # type: ignore
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Your Account SID and Auth Token from the Twilio Console
account_sid = os.getenv('TWILIO_ACCOUNT')
auth_token = os.getenv('TWILIO_AUTH')
client = Client(account_sid, auth_token)

# Making an outbound call
call = client.calls.create(
    url='http://demo.twilio.com/docs/voice.xml',  # TwiML to play a message or control the call
    to='+12066653279',  # Replace with your verified phone number
    from_='+18666064078'  # Replace with your Twilio phone number
)

print(f"Call SID: {call.sid}")