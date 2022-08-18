from flask import Blueprint, request
from dotenv import dotenv_values
import requests

# global "routes.py" variables

config = dotenv_values(".env")
BASE_URL = "https://api.themoviedb.org/3"
API_KEY = config.get("API_KEY")

tmdb_bp = Blueprint("tmdb_bp", __name__)

def fetch_tmdb(tmdb_api):
    '''Takes the tmdb url and returns the response from the TMDB API'''
    r = requests.get(tmdb_api)
    response = r.json()

    return response

# 1/Shows most popular movies/series

@tmdb_bp.route("/list/<type>", methods=["GET"])
def tmdb_request_movie(type):
    
    try:

        args = request.args
        page = args.get("page")

        if not page:
            page = 1

        if type == "movie":
            tmdb_api = f"{BASE_URL}/movie/popular?api_key={API_KEY}&page={page}"
        elif type == "series":
            tmdb_api = f"{BASE_URL}/tv/popular?api_key={API_KEY}&page={page}"
        else:
            return {"error": "Type must be movie or series"}, 400

        # make request to API
        return fetch_tmdb(tmdb_api)

    except Exception as e:
        error = str(e)
        return {"error": error}, 500

# 2/Shows genre of movies/series

@tmdb_bp.route("/genre/<type>", methods=["GET"])
def get_genre(type):
    try:

        if type == "movie":
            tmdb_api = f"{BASE_URL}/genre/movie/list?api_key={API_KEY}"
        elif type == "series":
            tmdb_api = f"{BASE_URL}/genre/tv/list?api_key={API_KEY}"
        else:
            return {"error": "Type must be movie or series"}, 400

        # make request to API
        return fetch_tmdb(tmdb_api)

    except Exception as e:
        error = str(e)
        return {"error": error}, 500

# 3/Searches all movies/series contains a specified value in query and page parameter

@tmdb_bp.route("/search/<type>", methods=["GET"])
def search(type):
    try:
        args = request.args
        query = args.get("query")
        page = args.get("page")

        if not page:
            page = 1
        
        if type == "movie":
            tmdb_api = f"{BASE_URL}/search/movie?api_key={API_KEY}&query={query}&page={page}"
        elif type == "series":
            tmdb_api = f"{BASE_URL}/search/tv?api_key={API_KEY}&query={query}&page={page}"
        else:
            return {"error": "Type must be movie or series"}, 400

        # make request to API
        return fetch_tmdb(tmdb_api)

    except Exception as e:
        error = str(e)
        return {"error":error}, 500
