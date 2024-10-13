import os
from twilio.rest import Client # type: ignore
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi import APIRouter, Request, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from the .env file
load_dotenv()

# Your Account SID and Auth Token from the Twilio Console
account_sid = os.getenv('TWILIO_ACCOUNT')
auth_token = os.getenv('TWILIO_AUTH')
client = Client(account_sid, auth_token)

router = APIRouter() #for sending data to main.py

# Allowed origins for your frontend (both local and production URLs)
origins = [
    "http://localhost:3000",  # Allow local development frontend
    "https://e-call.vercel.app",  # Allow Vercel or other deployed frontend (replace with your actual Vercel URL)
    # Add more allowed origins if needed
]

# Add CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,  # Allow all origins, or specify specific origins
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all HTTP methods
#     allow_headers=["*"],  # Allow all headers
# )

# Making an outbound call
# call = client.calls.create(
#     url='http://demo.twilio.com/docs/voice.xml',  # TwiML to play a message or control the call
#     to='+12066653279',  # Replace with your verified phone number
#     from_='+18666064078'  # Replace with your Twilio phone number
# )

@router.options("/make_call")
async def options_make_call():
    return JSONResponse(
        content={"message": "CORS preflight successful"},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    )

@router.post('/make_call')
async def make_call(request: Request, response: Response):
    try:
        body = await request.json()
        to_number = body.get('to', "+12066653279")
        from_number = '+18666064078'

        # Make the call here with Twilio
        call = client.calls.create(
            url='http://demo.twilio.com/docs/voice.xml',
            to=to_number,
            from_=from_number
        )

        response.headers["Access-Control-Allow-Origin"] = "*"
        return JSONResponse(content={'message': 'Call initiated', 'call_sid': call.sid})
    except Exception as e:
        return JSONResponse(content={'error': str(e)}, status_code=500)



print(f"Call SID: {call.sid}")