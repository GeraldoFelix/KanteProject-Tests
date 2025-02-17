import requests
import os
from dotenv import load_dotenv
from Topartistas import top4

load_dotenv()

CLIENT_ID = os.getenv("SPOTIFYKEY")
CLIENT_SECRET = os.getenv("SPOTIFYSECRET")

AUTH_URL = "https://accounts.spotify.com/api/token"

auth_response = requests.post(AUTH_URL, {
    "grant_type": "client_credentials",
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
})

auth_data = auth_response.json()
ACCESS_TOKEN = auth_data["access_token"]


def get_artist_image(artist_name):
    search_url = "https://api.spotify.com/v1/search"
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    params = {"q": artist_name, "type": "artist", "limit": 1}

    response = requests.get(search_url, headers=headers, params=params)
    
    if response.status_code == 200:
        result = response.json()
        artists = result.get("artists", {}).get("items", [])
        
        if artists:
            artist = artists[0]
            name = artist["name"]
            image_url = artist["images"][0]["url"] if artist["images"] else "Sem imagem"
            return name, image_url
    return artist_name, "Não encontrado"

def get_album_image(track_name, artist_name):
    search_url = 'https://api.spotify.com/v1/search'
    params = {
        'q': f'track:{track_name} artist:{artist_name}',
        'type': 'track',
        'limit': 1
    }
    headers = {
        'Authorization': f'Bearer {ACCESS_TOKEN}'
    }
    search_response = requests.get(search_url, headers=headers, params=params)
    search_data = search_response.json()
    if 'tracks' in search_data and search_data['tracks']['items']:
        track_info = search_data['tracks']['items'][0]
        album_images = track_info['album']['images']
        if album_images:
            return album_images[0]['url']  
    return None

# isso é so ver se ta funcionando
for artist in top4:
    name, image = get_artist_image(artist)
    print(f"{name}: {image}")
