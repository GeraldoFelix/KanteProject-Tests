import requests
from dotenv import load_dotenv
import os
from auth import buscar_artista  # Função que busca artistas na API do Spotify

load_dotenv()

# Sua chave de API do Last.fm
API_KEY = os.getenv("LASTFMKEY")
URL = "http://ws.audioscrobbler.com/2.0/"

# Parâmetros para buscar os artistas mais populares
topartists = {
    "method": "chart.gettopartists",
    "api_key": API_KEY,
    "format": "json",
    "limit": 4  # Pegando apenas os 4 primeiros artistas
}

def buscartop():
    resposta = requests.get(URL, params=topartists)
    
    if resposta.status_code == 200:
        data = resposta.json()
        artistas = data["artists"]["artist"]
        top4 = [artista["name"] for artista in artistas]  # Pegamos apenas os nomes

        # Buscar detalhes dos artistas na API do Spotify
        resultados = [buscar_artista(nome) for nome in top4]
        return resultados
    else:
        return []  # Retorna lista vazia se houver erro
