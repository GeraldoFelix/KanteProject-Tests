from flask import Flask, jsonify
from topartista import buscartop  # Importa função para buscar os Top Artistas
from auth import buscar_artista  # Importa função para buscar detalhes no Spotify

app = Flask(__name__)

# Rota para fornecer os dados dos Top Artistas com informações do Spotify
@app.route("/top-artistas")
def top_artistas():
    artistas_nomes = buscartop()  # Pega os 4 artistas do Last.fm
    
    # Busca detalhes do Spotify para cada artista
    resultados = [buscar_artista(nome) for nome in artistas_nomes]  
    return jsonify(resultados)  # Retorna os dados como JSON

if __name__ == "__main__":
    app.run(debug=True)
