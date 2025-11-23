from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from sqlmodel import Session, select
from app.models.user import User
from app.core.database import engine

router = APIRouter(prefix="/auth")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
def register(username: str, password: str):
    hashed_pw = pwd_context.hash(password)
    new_user = User(username=username, password_hash=hashed_pw)
    with Session(engine) as session:
        session.add(new_user)
        session.commit()
    return {"message": "User registered successfully"}

@router.post("/login")
def login(username: str, password: str):
    with Session(engine) as session:
        user = session.exec(select(User).where(User.username == username)).first()
        if not user or not pwd_context.verify(password, user.password_hash):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        # Here you'd return a JWT token
        return {"token": "fake-jwt-for-now"}