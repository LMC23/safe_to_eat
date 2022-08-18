import jwt
import datetime
from dotenv import dotenv_values

config = dotenv_values(".env")

def verify_token(token):
    try:
        key = config.get("JWT_SECRET")
        if key is None:
            raise ValueError("Could not get JWT secret.")
        decoded = jwt.decode(token, key, algorithms=["HS256"])
        return decoded
    except Exception as e:
        raise e