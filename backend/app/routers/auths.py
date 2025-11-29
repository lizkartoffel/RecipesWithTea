from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from sqlmodel import Session, select
from pydantic import BaseModel
from app.models.user import User
from app.core.database import engine

router = APIRouter(prefix="/auth")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthRequest(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(auth_data: AuthRequest):
    """Register a new user with username and password"""
    with Session(engine) as session:
        # Check if username already exists
        existing_user = session.exec(select(User).where(User.username == auth_data.username)).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already registered")
        
        # Hash password and create user
        hashed_pw = pwd_context.hash(auth_data.password)
        new_user = User(
            username=auth_data.username,
            display_name=auth_data.username,  # Default display name to username
            email=f"{auth_data.username}@example.com",  # Default email
            password_hash=hashed_pw
        )
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        
        return {
            "message": "User registered successfully",
            "user_id": new_user.id,
            "username": new_user.username
        }

@router.post("/login")
def login(auth_data: AuthRequest):
    """Login with username and password"""
    with Session(engine) as session:
        user = session.exec(select(User).where(User.username == auth_data.username)).first()
        if not user or not pwd_context.verify(auth_data.password, user.password_hash):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        return {
            "token": "fake-jwt-for-now",
            "user_id": user.id,
            "username": user.username,
            "display_name": user.display_name
        }
    



 # from fastapi import APIRouter, HTTPException
# from passlib.context import CryptContext
# from sqlmodel import Session, select
# from app.models.user import User
# from app.core.database import engine

# router = APIRouter(prefix="/auth")
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# @router.post("/register")
# def register(username: str, password: str):
#     hashed_pw = pwd_context.hash(password)
#     new_user = User(username=username, password_hash=hashed_pw)
#     with Session(engine) as session:
#         session.add(new_user)
#         session.commit()
#     return {"message": "User registered successfully"}

# @router.post("/login")
# def login(username: str, password: str):
#     with Session(engine) as session:
#         user = session.exec(select(User).where(User.username == username)).first()
#         if not user or not pwd_context.verify(password, user.password_hash):
#             raise HTTPException(status_code=401, detail="Invalid credentials")
#         # Here you'd return a JWT token
#         return {"token": "fake-jwt-for-now"}   