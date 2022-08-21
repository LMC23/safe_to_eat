from dotenv import dotenv_values
from supabase import create_client, Client

config = dotenv_values(".env")
SUPABASE_URL = config.get("SUPABASE_URL")
SUPABASE_KEY = config.get("SUPABASE_SECRET")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
