import requests
import os
from dotenv import load_dotenv

load_dotenv()

LASTFMKEY = os.getenv("LASTFMKEY")
URL = "http://ws.audioscrobbler.com/2.0/"

params = {
    "method": "chart.getTopArtists",
    "api_key": LASTFMKEY,
    "format": "json",
    "limit": 4 
}

response = requests.get(URL, params=params)
top4 =[]

if response.status_code == 200:
    data = response.json()
    top_artists = data["artists"]["artist"]
    print("Top 4 Artistas Populares no Last.fm:")
    for idx, artist in enumerate(top_artists, start=1):
        top4.append(artist['name'])
else:
    print("Erro ao buscar os dados:", response.status_code)