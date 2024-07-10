from fastapi import FastAPI, HTTPException, WebSocket, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from PIL import Image
from io import BytesIO
from datetime import datetime
from openai import OpenAI
import sqlite3
from kinde_sdk import Configuration
from kinde_sdk.kinde_api_client import GrantType, KindeApiClient
from vedastro import *  # install via pip
from geopy.geocoders import Nominatim
from timezonefinder import TimezoneFinder
import pytz
import json
import asyncio
from fastapi.responses import JSONResponse
import sys


app = FastAPI()


# Replace these with the actual values you received from Kinde
#KINDE_HOST = 'https://vanshmool.kinde.com'  # The Kinde platform URL for your account
#KINDE_CLIENT_ID = 'cb3226d7cafd4c37b1a13d8a48ad3dc9'      # Your Kinde Client ID 
#KINDE_CLIENT_SECRET = 'z5N7KHX5I8vj6ONRAZvTj1Vab51hpmeSGHRHg6aOGOfUoKSVjcq'  # Your Kinde Client Secret
#GRANT_TYPE = 'authorization_code'  # The grant type you are using ('client_credentials', 'authorization_code', or 'authorization_code_with_pkce')
#KINDE_REDIRECT_URL = 'http://localhost:3000/callback'  # Your callback URL set in the Kinde platform

# Configuration for Kinde API client
#configuration = Configuration(host=KINDE_HOST)
#kinde_api_client_params = {
#     "configuration": configuration,
#     "domain": KINDE_HOST,
#     "client_id": KINDE_CLIENT_ID,
#     "client_secret": KINDE_CLIENT_SECRET,
#     "grant_type": GRANT_TYPE,
#     "callback_url": KINDE_REDIRECT_URL
# }

# Initialize the Kinde API client with the provided parameters
#kinde_client = KindeApiClient(**kinde_api_client_params)

#Add CORS middleware to allow specific origins (or use ["*"] for all origins. To communicate with the REACT APP)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
#Your routes and the rest of the app go here

class AstroData(BaseModel):
    name: str
    pob: str
    dob: str
    tob: str
    gender: str

class UserPersonality:
    def __init__(self):
        self.image = None
        self.personality = None
        self.lock = asyncio.Lock()  # For thread-safe operations

    async def set_values(self, image, personality):
        async with self.lock:
            self.image = image
            self.personality = personality

    async def get_values(self):
        async with self.lock:
            return self.image, self.personality

    async def reset(self):
        async with self.lock:
            self.image = None
            self.personality = None

    def to_json(self):
        # Notice this method is not async; ensure it's only called from within an async context where locks are already acquired
        return json.dumps({"image": self.image, "personality": self.personality})
user_personality = UserPersonality()
###############################

@app.post("/submit-form")
async def submit_form(astro_data: AstroData):
    place = astro_data.pob
    dob_obj = datetime.strptime(astro_data.dob, "%Y-%m-%d")
    date_time = astro_data.tob + " " + dob_obj.strftime("%d/%m/%Y")
    gender=astro_data.gender
    print("Date time = " + date_time)
    print("Place="+place)
    print("Received data:", astro_data.model_dump_json())  # This line prints the received data
    def calculate_age(date_time_str):
        # Assuming the format is "hh:mm dd/mm/yyyy"
        date_time_obj = datetime.strptime(date_time_str, "%H:%M %d/%m/%Y")
        
        # Current time
        now = datetime.now()

        # Calculate difference in years
        age = now.year - date_time_obj.year - ((now.month, now.day) < (date_time_obj.month, date_time_obj.day))
        
        return age
    age=calculate_age(date_time)
    print(age)
    # Function to get geolocationpip and timezone
    def get_location_info(place):
        geolocator = Nominatim(user_agent="Astroapp")
        location = geolocator.geocode(place)
        if location:
            tf = TimezoneFinder()
            timezone_str = tf.timezone_at(lng=location.longitude, lat=location.latitude)
            return location.latitude, location.longitude, timezone_str
        else:
            return None, None, None
    # Get coordinates and timezone
    latitude, longitude, timezone = get_location_info(place)
    if latitude is not None and longitude is not None:
        # Convert user input to datetime object and localize it
        dt = datetime.strptime(date_time, '%H:%M %d/%m/%Y')
        local_tz = pytz.timezone(timezone)
        dt_localized = local_tz.localize(dt)

        # Set location
        geolocation = GeoLocation(place, latitude, longitude)
        
        # Set time with timezone
        time = Time(dt_localized.strftime('%H:%M %d/%m/%Y %z'), geolocation)
        # Run calculator to get result
        calcResult = Calculate.AllPlanetConstellation(time)

        # Display results
        Tools.Print(calcResult)
    else:
        print("Location not found.")
    #####################
            # set planet
            #planet = PlanetName.Sun

            # set location
            #geolocation = GeoLocation("Tokyo, Japan", 139.83, 35.65)

            # set time hh:mm dd/mm/yyyy zzz
            #time = Time("23:40 31/12/2010 +08:00", geolocation)

            # run calculator to get result
            #calcResult = Calculate.PlanetConstellation(planet, time)

            # display results
            #Tools.Print(calcResult)
    #################### 
        # Initialize an empty list to store planet details
    planet_details = []
    # Iterate through each planet in the result
    for planet in calcResult:
        # Convert constellation object to string and then split
        constellation_str = str(planet.Value).split(' -')[0]
        # Concatenate planet name (Key) and modified constellation
        detail = f"{planet.Key} in {constellation_str}"
        # Append the detail to the list
        planet_details.append(detail)
    # Join all details into a single string
    result_string = ', '.join(planet_details)
    print(result_string)
    """
    conn = sqlite3.connect('astrology_images.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS image_data (
            id INTEGER PRIMARY KEY,
            user_input1 TEXT,
            user_input2 TEXT,
            prompt TEXT,
            image_url TEXT,
            image_path TEXT,
            timestamp DATETIME
        )
    ''')
    conn.commit()
    """
    print('here')
    # Initialize the OpenAI client
    
    client = OpenAI(api_key = "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"
    )
             
    # user_input1 = input("Enter the planet's name (e.g., 'Sun'): ")
    # user_input2 = input("Enter the Nakshtra's name (e.g., 'Moola'): ")
    # Generate a prompt using GPT-3.5
    messages = ''
    description = client.chat.completions.create(
    model="gpt-4-1106-preview",
    messages=[
        {
            "role": "system", 
            "content": "You are a highly experienced vedic astrologer, who can describe a person's physical characteristics and profession by understanding their nakshtra placements. Use not more than 300 words to describe them."
        },
        {
            "role": "user", 
            "content": f"A {gender} person from {place} of {age} years of age has the following placements as per Vedic Astrology: {result_string}."
        }
    ]
    )
  
    ##for chunk in description:
    ##  print(chunk.choices[0].delta)
    print("______________________________start of prompt______________________________")
    print (description.choices[0].message.content)
    print("______________________________end of prompt______________________________")
    promptfordalle = description.choices[0].message.content
    print({promptfordalle})
    
    completion = client.chat.completions.create(
    ##gpt-3.5-turbo
    ##gpt-4-1106-preview
    ##gpt-4-0125-preview 
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a prompt generator for DALLE. Prompt should provide age, gender and location of the person. It should describe what the person looks like and mention the location that the image should be made in like - school, hospital, office etc. It should also mention several elements and props that should be a part of the image. The prompt should be less verbose. It should be crisp, clear and have things which have a visual representation. It should not have vague terms which do not have a visual representation"},
##when using dalle2
##        {"role": "user", "content": f"Generate a prompt for DALLE 2 using {promptfordalle}. use a very detailed and highly intricate setting. use the gender as {gender},ethnicity as {place} and age as {age} of the person."}
##when using dalle3        
        {"role": "user", "content": f"Make a very detailed illustrated image of a person. {promptfordalle}."}
    ]
    )
          
    gpt_prompt = completion.choices[0].message.content
    print({result_string})
    print({gender})
    print("GPT PROMPT BEGINS HERE - ")
    print(gpt_prompt)
    # Directory where images will be saved
    image_dir = "openaiimages"
    try:
        os.makedirs(image_dir, exist_ok=True)
    except Exception as e:
        print(f"Error creating directory: {e}")
        print(f"Current working directory: {os.getcwd()}")
        # Handle the error or exit the script
    # Generate an image using the prompt from GPT-3.5
    response = client.images.generate(
        #model="dall-e-2",
        #prompt=gpt_prompt,
        #size="1024x1024",
        #quality="standard",
    model="dall-e-3",
    prompt=gpt_prompt,
    size="1792x1024",
    quality="hd",
    n=1,
    )         
    # Get the URL of the generated image
    image_url = response.data[0].url
    print(" Line 238 + ", image_url)
    # Download the image
    response = requests.get(image_url)
    image = Image.open(BytesIO(response.content))
    await user_personality.set_values(image_url,promptfordalle)
    print("Line 244+",user_personality.image, user_personality.personality, "______END OF THIS____")
    # Get the current date and time
    now = datetime.now()
    date_time_format = now.strftime("%d%m%Y_%H%M%S")
    # Save the image with a name based on the current date and time
    image_path = os.path.join(image_dir, f"generated_image_{date_time_format}.png")
    image.save(image_path)
    print("___________IMAGE PATH IS: ", image_path, "_____________")
    # Display the image
    image.show()
    
    return JSONResponse(content={"status": "success", "message": "Data processed successfully", "image_url": image_url, "personality_description": promptfordalle}, status_code=200)


#@app.route("/login")
#def login():
#    return app.redirect(kinde_client.get_login_url())
