from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

try:
    print("Attempting to hash 'secret'...")
    hash_ = pwd_context.hash("secret")
    print(f"Success: {hash_}")
except Exception as e:
    print(f"Error: {e}")
