import os
from flask import Flask, jsonify
from spotify import get_artist_image, get_album_image
from flask_cors import CORS
from Topartistas import top4
from TopTracks import top4_tracks, get_top_tracks

app = Flask(__name__)
CORS(app)

@app.route("/api/artistas")
def artistas():
    artistas_info = []

    for artist in top4:
        name, image_url = get_artist_image(artist)
        artistas_info.append({"name": name, "image": image_url})

    return jsonify(artistas_info)

@app.route("/api/musicas")
def musicas():
    musicas_info = []

    for musica in top4_tracks:
        track_name = musica['name']  # Nome da música
        artist_name = musica['artist']  # Nome do artista
        image_url = get_album_image(track_name, artist_name)  # Busca a imagem do álbum
        musicas_info.append({"name": track_name, "artist": artist_name, "image": image_url})

    return jsonify(musicas_info)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))  # Usa 5000 por padrão se a variável PORT não estiver definida
    app.run(debug=True, host="0.0.0.0", port=port)
