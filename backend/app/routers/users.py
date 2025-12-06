from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from app.models.user import User
from ..schemas.user_schema import ReadUser, CreateUser, UserWithDetails
from app.core.database import createSession
from passlib.context import CryptContext # NEW IMPORT

router = APIRouter(prefix="/users")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") # NEW

@router.get("/", response_model=List[ReadUser])
def get_users(session: Session = Depends(createSession)):
    # ... (unchanged) ...
    users = session.exec(select(User)).all()
    return users

@router.get("/{user_id}", response_model=UserWithDetails)
def get_user(user_id: int, session: Session = Depends(createSession)):
    # ... (unchanged) ...
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create response with counts
    return UserWithDetails(
        id=user.id,
        username=user.username,
        display_name=user.display_name,
        bio=user.bio,
        created_at=user.created_at,
        recipe_count=len(user.recipes),
        favorite_count=len(user.favorites),
        review_count=len(user.reviews)
    )

@router.get("/username/{username}", response_model=UserWithDetails)
def get_user_by_username(username: str, session: Session = Depends(createSession)):
    # ... (unchanged) ...
    user = session.exec(select(User).where(User.username == username)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create response with counts
    return UserWithDetails(
        id=user.id,
        username=user.username,
        display_name=user.display_name,
        bio=user.bio,
        created_at=user.created_at,
        recipe_count=len(user.recipes),
        favorite_count=len(user.favorites),
        review_count=len(user.reviews)
    )

@router.post("/", response_model=ReadUser)
def create_user(user: CreateUser, session: Session = Depends(createSession)):
    # Check if username already exists
    db_user = session.exec(select(User).where(User.username == user.username)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Check if email already exists
    db_user = session.exec(select(User).where(User.email == user.email)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # NEW: Hash the password before storing it
    hashed_pw = pwd_context.hash(user.password)
    
    # Create new user
    new_user = User(
        username=user.username,
        display_name=user.display_name,
        email=user.email,
        password_hash=hashed_pw, # Use the HASHED password
        bio=user.bio
    )
    
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user

@router.delete("/{user_id}", response_model=dict)
def delete_user(user_id: int, session: Session = Depends(createSession)):
    # ... (unchanged) ...
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    session.delete(user)
    session.commit()
    return {"detail": "User deleted successfully"}
# from fastapi import APIRouter, Depends, HTTPException
# from sqlmodel import Session, select
# from typing import List
# from app.models.user import User
# from ..schemas.user_schema import ReadUser, CreateUser, UserWithDetails
# from app.core.database import createSession

# router = APIRouter(prefix="/users")

# @router.get("/", response_model=List[ReadUser])
# def get_users(session: Session = Depends(createSession)):
#     users = session.exec(select(User)).all()
#     return users

# @router.get("/{user_id}", response_model=UserWithDetails)
# def get_user(user_id: int, session: Session = Depends(createSession)):
#     user = session.get(User, user_id)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
    
#     # Create response with counts
#     return UserWithDetails(
#         id=user.id,
#         username=user.username,
#         display_name=user.display_name,
#         bio=user.bio,
#         created_at=user.created_at,
#         recipe_count=len(user.recipes),
#         favorite_count=len(user.favorites),
#         review_count=len(user.reviews)
#     )

# @router.get("/username/{username}", response_model=UserWithDetails)
# def get_user_by_username(username: str, session: Session = Depends(createSession)):
#     user = session.exec(select(User).where(User.username == username)).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
    
#     # Create response with counts
#     return UserWithDetails(
#         id=user.id,
#         username=user.username,
#         display_name=user.display_name,
#         bio=user.bio,
#         created_at=user.created_at,
#         recipe_count=len(user.recipes),
#         favorite_count=len(user.favorites),
#         review_count=len(user.reviews)
#     )

# @router.post("/", response_model=ReadUser)
# def create_user(user: CreateUser, session: Session = Depends(createSession)):
#     # Check if username already exists
#     db_user = session.exec(select(User).where(User.username == user.username)).first()
#     if db_user:
#         raise HTTPException(status_code=400, detail="Username already registered")
    
#     # Check if email already exists
#     db_user = session.exec(select(User).where(User.email == user.email)).first()
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
    
#     # Create new user
#     new_user = User(
#         username=user.username,
#         display_name=user.display_name,
#         email=user.email,
#         password_hash=user.password,  # Should be hashed in production!
#         bio=user.bio
#     )
    
#     session.add(new_user)
#     session.commit()
#     session.refresh(new_user)
#     return new_user

# @router.delete("/{user_id}", response_model=dict)
# def delete_user(user_id: int, session: Session = Depends(createSession)):
#     user = session.get(User, user_id)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
    
#     session.delete(user)
#     session.commit()
#     return {"detail": "User deleted successfully"}