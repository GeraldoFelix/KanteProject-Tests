import requests
import os
from dotenv import load_dotenv

load_dotenv()

LASTFMKEY = os.getenv("LASTFMKEY")

lastfm_api_key = os.getenv("LASTFMKEY")
top4tracks=[]

def get_top_tracks(lastfm_api_key, limit=4):
    url = 'http://ws.audioscrobbler.com/2.0/'
    params = {
        'method': 'chart.gettoptracks',
        'api_key': lastfm_api_key,
        'format': 'json',
        'limit': limit
    }
    response = requests.get(url, params=params)
    data = response.json()
    top_tracks = data['tracks']['track']
    
    # Criar uma lista de dicionários com o nome da música e o nome do artista
    top4_tracks = []
    for track in top_tracks:
        track_name = track['name']
        artist_name = track['artist']['name']
        top4_tracks.append({"name": track_name, "artist": artist_name})
    
    return top4_tracks


top4_tracks = get_top_tracks(lastfm_api_key)
# pra ver se ta funcionando
print(top4_tracks)