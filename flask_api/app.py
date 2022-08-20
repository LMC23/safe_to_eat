from flask import Flask
from tmdb_bp.routes import tmdb_bp
from supabase_movies_bp.routes import supabase_bp
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

app.register_blueprint(tmdb_bp, url_prefix='/tmdb')
app.register_blueprint(supabase_bp, url_prefix='/supabase')

@app.route("/")
def hello_world():
    return "<p>Hello, World 1!</p>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)