from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import students, stories
from .database import db
# Trigger reload= FastAPI(title="ByteTales API")

app = FastAPI(title="ByteTales API")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False, # Wildcard cannot be used with credentials. We use Bearer token anyway.
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(students.router)
app.include_router(stories.router)

@app.get("/")
async def root():
    return {"message": "Welcome to ByteTales API"}
