from app import *
from fastapi import FastAPI
#
# from core import *
from fastapi.middleware.cors import CORSMiddleware

createDB()

app = FastAPI()

@app.on_event("startup")
def on_startup():
    createDB()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def hi():
    return{"smthin"}


