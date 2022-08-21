from flask import Blueprint, request
from dotenv import dotenv_values
import requests

from lib.supabase import supabase

# global "routes.py" variables

config = dotenv_values(".env")
BASE_URL = "https://api.themoviedb.org/3"
API_KEY = config.get("API_KEY")

tmdb_bp = Blueprint("tmdb_bp", __name__)

# https://supabase.com/blog/postgresql-views
# users = supabase.auth.api.list_users()
# for user in users:
#     print(user.id, user.email, user.user_metadata)


def fetch_tmdb(tmdb_api):
    '''Takes the tmdb url and returns the response from the TMDB API'''
    r = requests.get(tmdb_api)
    response = r.json()

    return response

def fetch_show_by_type_id(type, id):
    if type == "movie":
        tmdb_api = f"{BASE_URL}/movie/{id}?api_key={API_KEY}"
    elif type == "series":
        tmdb_api = f"{BASE_URL}/tv/{id}?api_key={API_KEY}"
    else:
        return {"error": "Type must be movie or series"}, 400

    tmdb_response = fetch_tmdb(tmdb_api)
    return tmdb_response

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

# Get the Credits of the movie

@tmdb_bp.route("/credits/<type>/<id>")
def get_credits(type, id):
    try:
        if type == "movie":
            tmdb_api = f"{BASE_URL}/movie/{id}/credits?api_key={API_KEY}"
        elif type == "series":
            tmdb_api = f"{BASE_URL}/tv/{id}/credits?api_key={API_KEY}"
        else:
            return {"error": "Type must be movie or series"}, 400

        return fetch_tmdb(tmdb_api)

    except Exception as e:
        error = str(e)
        return {"error": error}

@tmdb_bp.route("/<type>/<id>", methods=["GET"])
def get_show_by_id(type, id):
    try:
        
        tmdb_response = fetch_show_by_type_id(type, id)

        supabase_response = supabase.table("movies").select("*, votes(*)").eq('tmdb_id', id).execute()
        
        return {"tmdb_response":tmdb_response,
                "supabase_response": supabase_response.data[0] if len(supabase_response.data) > 0 else None
                }

    except Exception as e:
        error = str(e)
        return {"error":error}
