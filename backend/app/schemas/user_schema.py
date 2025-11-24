from datetime import datetime
from typing import List, Optional
from sqlmodel import SQLModel

class ReadUser(SQLModel):
    id: int
    username: str
    display_name: str
    email: str
    bio: Optional[str] = None
    created_at: datetime

class CreateUser(SQLModel):
    username: str
    display_name: str
    email: str
    password: str  # plaintext password for creation only
    bio: Optional[str] = None

class UpdateUser(SQLModel):
    display_name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None  # plaintext password for update only
    bio: Optional[str] = None

class UserPublic(SQLModel):
    id: int
    username: str
    display_name: str
    bio: Optional[str] = None
    created_at: datetime

class UserWithRecipes(UserPublic):
    recipes: List["Recipe"] = []
    favorites: List["Favorite"] = []
    reviews: List["Review"] = []

class UserWithCounts(UserPublic):
    recipe_count: int = 0
    favorite_count: int = 0
    review_count: int = 0

class UserWithDetails(UserWithCounts):
    recipes: List["Recipe"] = []
    favorites: List["Favorite"] = []
    reviews: List["Review"] = []

class LoginData(SQLModel):
    username: str
    password: str

class Token(SQLModel):   
    access_token: str
    token_type: str = "bearer"
    user: UserPublic
    
class TokenData(SQLModel):
    user_id: Optional[int] = None
    username: Optional[str] = None
# Relationships vs Foreign Keys
# Foreign keys are used to enforce referential integrity at the database level.
