from flask import request
from functools import wraps
from lib.auth import verify_token


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        headers = request.headers
        token = headers.get("token")
        if not token:
            return {"error": "Unauthorized", "code": 401}, 401
        try:
            payload = verify_token(token)
            request.payload = payload
            return f(*args, **kwargs)
        except Exception as e:
            if "expired" in str(e):
                return {"error": str(e), "code": 401}, 401
            return {"error": "Unauthorized", "code": 401}, 401

    return decorator
