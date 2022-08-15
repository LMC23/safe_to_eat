from flask import Blueprint, request

tmdb_bp = Blueprint("tmdb_bp", __name__)

@tmdb_bp.route("/", methods=["GET"])
def tmdb_request():
    return {"movie":"Purple hearts"}