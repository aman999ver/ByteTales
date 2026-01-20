from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import students, stories
from .database import db
# Trigger reload= FastAPI(title="ByteTales API")

from .config import settings
import json

app = FastAPI(title="ByteTales API")

# Parse allowed origins from JSON string
try:
    origins = json.loads(settings.ALLOWED_ORIGINS)
except:
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(students.router)
app.include_router(stories.router)

from fastapi.staticfiles import StaticFiles
import os

# ... (existing code, ensure it aligns)

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

# Serve Frontend in Production
if os.path.isdir("../frontend/dist"):
    app.mount("/assets", StaticFiles(directory="../frontend/dist/assets"), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Allow API calls to pass through (though strictly they should match explicit routes above)
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API endpoint not found")
        
        # Check if file exists in dist (e.g. favicon.ico)
        file_path = f"../frontend/dist/{full_path}"
        if os.path.isfile(file_path):
             from fastapi.responses import FileResponse
             return FileResponse(file_path)
             
        # Fallback to index.html for React Router
        return FileResponse("../frontend/dist/index.html")
