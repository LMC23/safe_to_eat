from flask import Blueprint, request

supabase_bp = Blueprint("supabase_bp", __name__)

@supabase_bp.route("/add_show", methods=["POST"])
def create_show():
    return {"type":"series",
            "title": "Sandman"
    }

# @supabase_bp.route("/movie", methods=["GET"])
# def return_movie():
#         return {"test": "this is a movie"}

