import requests
import json

def test_update():
    try:
        base_url = "http://127.0.0.1:8000"
        
        # 0. Register a temp user (idempotent-ish)
        user_email = "test405@example.com"
        reg_data = {
            "name": "Test 405 User", 
            "email": user_email, 
            "password": "password123",
            "face_encoding": [] 
        }
        print(f"Registering {user_email}...")
        requests.post(f"{base_url}/students/register", json=reg_data)

        # 1. Login
        print("Logging in...")
        auth_data = {
            "username": user_email, 
            "password": "password123"
        }
        login_res = requests.post(f"{base_url}/students/login", data=auth_data)
        
        if login_res.status_code != 200:
            print(f"Login Failed: {login_res.status_code} {login_res.text}")
            return

        token = login_res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # 2. Try PUT /students/me
        print("Attempting PUT /students/me...")
        update_data = {"avatar": "🧪"}
        update_res = requests.put(
            f"{base_url}/students/me", 
            json=update_data, 
            headers=headers
        )

        print(f"PUT Status: {update_res.status_code}")
        print(f"PUT Response: {update_res.text}")

        # 3. Verify GET /students/me
        get_res = requests.get(f"{base_url}/students/me", headers=headers)
        print(f"GET Status: {get_res.status_code}")
        print(f"GET Avatar: {get_res.json().get('avatar')}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_update()
