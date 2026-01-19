# ByteTales: Early Computer Science Adventures

A full-stack educational web application for kids to learn CS concepts.

## Prerequisites
- Node.js & npm
- Python 3.10+
- MongoDB (Running locally on default port 27017 or update `backend/.env`)

## Setup Instructions

### 1. Database
Ensure MongoDB is running.
`mongod`

### 2. Backend
Open a terminal in `backend/`:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
# source venv/bin/activate

pip install -r requirements.txt
# Note: face_recognition might fail on Windows. The app has a fallback/mock mode.
```

Run the server:
```bash
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend
Open a new terminal in `frontend/`:
```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Demo Flow
1. Go to `/admin` and click "Seed Demo Data".
2. Go to `/register`. Register with name, email, password, and Capture Face.
3. Login using Face or Password.
4. In Dashboard, click on "The Binary Forest".
5. Read parts. At the end, take the Quiz.
