from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

from .models import *

from app.core.database import createDB

from .routers import routers

app = FastAPI(  title="Recipe Sharing Platform API",
    version="0.1.0",
    description="A robust API for managing recipes, users, and reviews.",
)

@app.on_event("startup")
def on_startup():
    """Initializes the database by creating tables when the application starts."""
    # Using your naming convention (createDB)
    print("Running database creation on startup...")
    createDB() 

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Added Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers

for router in routers:
    app.include_router(router)

@app.get("/")
def root():
    return {"message": "Welcome to Recipes API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}