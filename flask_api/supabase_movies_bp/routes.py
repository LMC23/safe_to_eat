from flask import Blueprint, request
from lib.middleware import token_required
from lib.supabase import supabase

# https://supabase.com/docs/guides/client-libraries
supabase_bp = Blueprint("supabase_bp", __name__)

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
        data = supabase.table("movies").select("*").execute()
        return {"data": data.data}
    except Exception as e:
        error = str(e)
        return {"error": error}


