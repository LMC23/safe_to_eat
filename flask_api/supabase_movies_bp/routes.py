from flask import Blueprint, request
from lib.middleware import token_required
from lib.supabase import supabase
from tmdb_bp.routes import fetch_show_by_type_id

# https://supabase.com/docs/guides/client-libraries
supabase_bp = Blueprint("supabase_bp", __name__)
IMG_PATH = 'https://image.tmdb.org/t/p/w780'

@supabase_bp.route("/add_show", methods=["POST"])
@token_required
def create_show():
    try:
        body = request.json
        data = supabase.table("movies").insert(body).execute()
        return {'data': data.data[0]}
    except Exception as e:
        error = str(e)
        return {'error': error}

@supabase_bp.route("/list", methods=["GET"])
def return_shows():
    try:
        data = supabase.table("movies").select("*, votes(*)").execute()
        return {"data": data.data}
    except Exception as e:
        error = str(e)
        return {"error": error}

@supabase_bp.route("/vote", methods=["POST"])
@token_required
def vote_show():
    try:
        # get body data
        body = request.json
        tmdb_id = body.get("tmdb_id")
        type = body.get("type")
        is_safe = body.get("is_safe")

        # data validation
        if tmdb_id is None or is_safe is None:
            return {"error": "You must provide a tmdb_id and type."}, 400
        if type != "movie" and type != "series":
            return {"error": "Type must be movie or series"}, 400

        # get user_id from token
        user_id = request.payload.get("sub")

        # check if movies exists in our database
        movie_id = supabase.table("movies").select("id").eq("tmdb_id", tmdb_id).execute()

        # if show exists 
        if len(movie_id.data) > 0:
            # checks if user voted
            user_vote = supabase.table("votes").select("*").eq("user_id", user_id).eq("movie_id", movie_id.data[0]["id"]).execute()

            # if user already voted 
            if len(user_vote.data) > 0:
                # changes the vote with the current value 
                updated_vote = supabase.table("votes").update({"is_safe": is_safe}).eq("id", user_vote.data[0]["id"]).execute()
                return {"data": updated_vote.data[0]}, 201
            # user did not vote
            else:
                # create new vote
                new_vote = supabase.table("votes").insert({"is_safe": is_safe, "user_id": user_id, "movie_id": movie_id.data[0]["id"]}).execute()
                return {"data": new_vote.data[0]}, 201
        # show doesn't exists
        else:
            # get show from tmdb
            tmdb_response = fetch_show_by_type_id(type, tmdb_id)
            title = tmdb_response.get("name") if type == 'series' else tmdb_response.get("title")
            
            # inserts the values from insert_value into supabase db (create show in db)
            insert_values = {
                "name": title,
                "img_url": IMG_PATH + tmdb_response.get("poster_path"),
                "mark": tmdb_response.get("vote_average"),
                "description": tmdb_response.get("overview"),
                "safe_to_eat": False,
                "type": type,
                "tmdb_id": tmdb_response.get("id")
            }  
            new_movie = supabase.table("movies").insert(insert_values).execute()

            # checks if user voted
            user_vote = supabase.table("votes").select("*").eq("user_id", user_id).eq("movie_id", new_movie.data[0]["id"]).execute()
            # if user already voted
            if len(user_vote.data) > 0:
                # change the vote with the current value
                updated_vote = supabase.table("votes").update({"is_safe": is_safe}).eq("id", user_vote.data[0]["id"]).execute()
                return {"data": updated_vote.data[0]}, 201
            # user did not vote
            else:
                # create new vote
                new_vote = supabase.table("votes").insert({"is_safe": is_safe, "user_id": user_id, "movie_id": new_movie.data[0]["id"]}).execute()
                return {"data": new_vote.data[0]}, 201
        
        
    except Exception as e:
        error = str(e)
        return {"error": error}
