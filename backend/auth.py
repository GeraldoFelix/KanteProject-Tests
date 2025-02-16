import requests
import os
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

# Função para autenticar no Spotify e pegar o token
def get_spotify_token():
    auth_url = "https://accounts.spotify.com/api/token"
    auth_response = requests.post(auth_url, {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    })
    return auth_response.json().get("access_token")

# Função para buscar detalhes do artista no Spotify
def buscar_artista(artista_nome):
    token = get_spotify_token()
    headers = {"Authorization": f"Bearer {token}"}
    
    search_url = f"https://api.spotify.com/v1/search?q={artista_nome}&type=artist&limit=1"
    response = requests.get(search_url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        if data["artists"]["items"]:
            artista = data["artists"]["items"][0]
            return {
                "nome": artista["name"],
                "popularidade": artista["popularity"],
                "imagem": artista["images"][0]["url"] if artista["images"] else "Imagem não disponível"
            }
    return None  # Retorna None se não encontrar
