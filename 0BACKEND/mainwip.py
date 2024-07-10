import os
from fastapi import FastAPI, Query, HTTPException
import requests
from PIL import Image
from io import BytesIO
from datetime import datetime
from openai import OpenAI
import sqlite3



from vedastro import *  # install via pip
from geopy.geocoders import Nominatim
from timezonefinder import TimezoneFinder
from datetime import datetime
import pytz

app = FastAPI()


@app.get("/get_birth_details/")
async def get_birth_details(place: str = Query(..., description="Enter the City and Country of birth (Eg. 'Delhi, India')"),
                            date_time: str = Query(..., description="Enter the date and time of birth (format: 'HH:MM DD/MM/YYYY')"),
                            gender: str = Query(..., description="Enter the gender:")):
    return {"place": place, "date_time": date_time, "gender": gender}


# Prompt user for input
#place = input("Enter the City and Country of birth (Eg. 'Delhi, India'): ")
#date_time = input("Enter the date and time of birth (format: 'HH:MM DD/MM/YYYY'): ")
#gender = input("Enter the gender:")


def calculate_age(date_time_str):
    # Assuming the format is "hh:mm dd/mm/yyyy"
    date_time_obj = datetime.strptime(date_time_str, "%H:%M %d/%m/%Y")
    
    # Current time
    now = datetime.now()

    # Calculate difference in years
    age = now.year - date_time_obj.year - ((now.month, now.day) < (date_time_obj.month, date_time_obj.day))
    
    return age

age=calculate_age(date_time)

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

# Initialize the OpenAI client
client = OpenAI()

# user_input1 = input("Enter the planet's name (e.g., 'Sun'): ")
# user_input2 = input("Enter the Nakshtra's name (e.g., 'Moola'): ")


# Generate a prompt using GPT-3.5
try:
    description = client.chat.completions.create(
    model="gpt-4-1106-preview",
    messages=[
        {
            "role": "system", 
            "content": "You are a vedic astrologer, which can describe a person's looks, qualities, habits, profession, characteristics, behaviour and outlook towards life by understanding their nakshtra placements."
        },
        {
            "role": "user", 
            "content": f"Describe a {gender} from {place} of {age} years of age with {result_string} as per Vedic Astrology. Use not more than 400 words. Do not mention any graha, planet or nakshtra in this description. Just describe the person's looks, qualities, habits, profession, characteristics, behaviour and outlook towards life in a single paragraph."
        }
    ]
    )
except Exception as e:
    print(e)   


##for chunk in description:
##  print(chunk.choices[0].delta)
print("______________________________start of prompt______________________________")
print (description.choices[0].message.content)
print("______________________________end of prompt______________________________")
promptfordalle = description.choices[0].message.content

completion = client.chat.completions.create(
  model="gpt-4-1106-preview",
  messages=[
    {"role": "system", "content": "You are a prompt generator for DALL.E. You receive a text and generate a prompt, using which DALL.E can create an image."},
    {"role": "user", "content": f"Generate a prompt for DALL.E using {promptfordalle}. use a very detailed and highly intricate setting. use the gender as {gender},ethnicity as {place} and age as {age} of the person."}
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
  model="dall-e-3",
  prompt=gpt_prompt,
  size="1792x1024",
  quality="hd",
  n=1,
)

# Get the URL of the generated image
image_url = response.data[0].url
print(image_url)
# Download the image
response = requests.get(image_url)
image = Image.open(BytesIO(response.content))

# Get the current date and time
now = datetime.now()
date_time_format = now.strftime("%d%m%Y_%H%M%S")

# Save the image with a name based on the current date and time
image_path = os.path.join(image_dir, f"generated_image_{date_time_format}.png")
image.save(image_path)

# Display the image
image.show()

# Print the path of the saved image
#print(f"Image saved at: {image_path}")

# cursor.execute('''
#     INSERT INTO image_data (user_input1, user_input2, prompt, image_url, image_path, timestamp)
#     VALUES (?, ?, ?, ?, ?, ?)
# ''', (user_input1, user_input2, gpt_prompt, image_url, image_path, date_time_format))

# conn.commit()

