from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from models import User
from schemas import *
from core import createSession

router = APIRouter(prefix="/me")

@router.get("/users/", response_model=List[ReadUser]) #all users, admin only
def get_users(session: Session = Depends(createSession)):
    users = session.exec(select(User)).all()
    return users    

@router.get("/users/{user_id}", response_model=UserWithDetails) #get user by id with details
def get_user(user_id: int, session: Session = Depends(createSession)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/users/username/{username}", response_model=UserWithDetails) #get user by username with details
def get_user_by_username(username: str, session: Session = Depends(createSession)):   
    user = session.exec(select(User).where(User.username == username)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/users/", response_model=ReadUser) #create user
def create_user(user: CreateUser, session: Session = Depends(createSession)):
    db_user = session.exec(select(User).where(User.username == user.username)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    db_user = session.exec(select(User).where(User.email == user.email)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User.from_orm(user)
    new_user.set_password(user.password)  # Hash the password before storing
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user