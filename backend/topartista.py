import requests
from dotenv import load_dotenv
import os
from auth import buscar_artista

load_dotenv()
# Sua chave de API do Last.fm (substitua pela sua)
API_KEY=os.getenv('LASTFMKEY')
URL = "http://ws.audioscrobbler.com/2.0/"

# Parâmetros para buscar os artistas mais populares
topartists = {
    "method": "chart.gettopartists",
    "api_key": API_KEY,
    "format": "json",
    "limit": 4  # Pega os 10 artistas mais populares
}

# Fazendo a requisição
resposta = requests.get(URL, params=topartists)
top4 = []
def buscartop(resposta):
    if resposta.status_code == 200:
        data = resposta.json()
        artistas = data["artists"]["artist"]
    
    print("🎶 Top 10 artistas no Last.fm:")
    for i, artista in enumerate(artistas, 1):
        print(f"{i}. {artista['name']} - {artista['listeners']} ouvintes")
        top4.append(artista['name'])
    else:
       print("Erro ao buscar os artistas do Last.fm")

buscartop(resposta)
for i in range (4):
    buscar_artista(top4[i])
