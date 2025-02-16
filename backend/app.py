from flask import Flask, jsonify
from spotify import get_artist_image
from flask_cors import CORS
from Topartistas import top4

app = Flask(__name__)
CORS(app)

@app.route("/api/artistas")
def artistas():
    artistas_info = []

    for artist in top4:
        name, image_url = get_artist_image(artist)
        artistas_info.append({"name": name, "image": image_url})

    return jsonify(artistas_info)

if __name__ == "__main__":
    app.run(debug=True)
