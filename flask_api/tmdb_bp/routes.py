from flask import Blueprint, request
from dotenv import dotenv_values
import requests

# global "routes.py" variables

config = dotenv_values(".env")
BASE_URL = "https://api.themoviedb.org/3"
query = config.get("API_KEY")

tmdb_bp = Blueprint("tmdb_bp", __name__)

@tmdb_bp.route("/movie", methods=["GET"])
def tmdb_request():

    try:

        args = request.args
        page = args.get("page")

        if not page:
            page = 1

        tmdb_api = f"{BASE_URL}/movie/popular?api_key={query}&page={page}"
        print(tmdb_api)

        # make request to API
        r = requests.get(tmdb_api)
        response = r.json()
        # films_search = response.get("body").get("original_title")

        return response
    except Exception as e:
        error = str(e)
        return {"error": error}, 500

@tmdb_bp.route("/get_genre", methods=["GET"])
def get_genre():
    try:
        tmdb_api = f"{BASE_URL}/genre/movie/list?api_key={query}"

        # make request to API
        r = requests.get(tmdb_api)
        response = r.json()

        return response

    except Exception as e:
        error = str(e)
        return {"error": error}, 500


# @tmdb_bp.route("/series", methods["GET"])
# def tmdb_request():

    # ruta pt toate filmele populare 
    
    # ruta pt toate serialele populare
