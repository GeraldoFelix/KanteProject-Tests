from flask import Flask, request, jsonify
import lyricsgenius
from dotenv import load_dotenv
import os
from flask_cors import CORS
import re

load_dotenv()

# Sua chave da API do Genius (substitua pela sua)
GENIUS_API_KEY = os.getenv("GENIUSKEY")

# Inicializa o Genius API
genius = lyricsgenius.Genius(GENIUS_API_KEY)
genius.verbose = False  # Evita logs desnecessários
genius.remove_section_headers = True  # Remove seções como [Refrão]
genius.skip_non_songs = True  # Evita resultados irrelevantes

app = Flask(__name__)
CORS(app)

def limpar_titulo(titulo):
    """Remove textos extras do título da música, como '(feat... )', '[with...]', '[prod... ]', etc."""
    titulo_limpo = re.sub(r"\(.*?\)|\[.*?\]", "", titulo)  # Remove parênteses e colchetes
    titulo_limpo = re.sub(r"with .*", "", titulo_limpo, flags=re.IGNORECASE)  # Remove "with IZA" se existir
    return titulo_limpo.strip()  # Remove espaços extras

@app.route('/letra', methods=['GET'])
def obter_letra():
    musica = request.args.get('musica')
    artista = request.args.get('artista')
    
    if not musica or not artista:
        return jsonify({'erro': 'Parâmetros inválidos'}), 400

    try:
        musica_limpa = limpar_titulo(musica)  # 🔥 Tenta buscar sem "(with IZA)"
        print(f"🔍 Buscando letra para: {musica_limpa} - {artista}")

        # Primeira tentativa: com nome limpo
        song = genius.search_song(musica_limpa, artista)
        
        # Se não encontrar, tenta o nome original
        if not song:
            print("⚠️ Primeira busca falhou, tentando com nome original...")
            song = genius.search_song(musica, artista)

        if song:
            return jsonify({'lyrics': song.lyrics})
        else:
            return jsonify({'erro': 'Letra não encontrada'}), 404
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))  # Usa 5000 por padrão se a variável PORT não estiver definida
    app.run(debug=True, host="0.0.0.0", port=port)
