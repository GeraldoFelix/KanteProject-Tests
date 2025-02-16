import requests
from dotenv import load_dotenv
import os
from flask import Flask, jsonify

load_dotenv()

# 🔑 Substitua pelos seus dados do Spotify Developer
CLIENT_ID = os.getenv('SPOTIFYKEY')
CLIENT_SECRET =os.getenv('SPOTIFYSECRET')

# URL para obter o token de acesso
TOKEN_URL = "https://accounts.spotify.com/api/token"

# Obtendo o token de acesso
auth_response = requests.post(TOKEN_URL, {
    "grant_type": "client_credentials",
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
})

# Verificando se a autenticação foi bem-sucedida
auth_data = auth_response.json()
ACCESS_TOKEN = auth_data.get("access_token")

# Headers para autenticação
headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}

def buscar_artista(artista_nome):
    # Fazendo a busca do artista na API do Spotify
    url = f"https://api.spotify.com/v1/search?q={artista_nome}&type=artist&limit=1"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        if data["artists"]["items"]:
            artista = data["artists"]["items"][0]
            nome = artista["name"]
            popularidade = artista["popularity"]
            imagem_url = artista["images"][0]["url"] if artista["images"] else "Imagem não disponível"

            print(f"🎤 Artista: {nome}")
            print(f"⭐ Popularidade: {popularidade}/100")
            print(f"📷 Imagem: {imagem_url}\n")
        else:
            print(f"⚠️ Não foi possível encontrar {artista_nome}")
    else:
        print(f"Erro ao buscar {artista_nome}")
