from __future__ import annotations
from datetime import datetime
from typing import List, Optional, TYPE_CHECKING
from sqlmodel import SQLModel
from pydantic import ConfigDict

# Only import for type checking to avoid circular imports
if TYPE_CHECKING:
    from ..models.recipe import Recipe
    from ..models.favorite import Favorite
    from ..models.review import Review

class ReadUser(SQLModel):
    id: int
    username: str
    display_name: str
    email: str
    bio: Optional[str] = None
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class CreateUser(SQLModel):
    username: str
    display_name: str
    email: str
    password: str  # plaintext password for creation only
    bio: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)

class UpdateUser(SQLModel):
    display_name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None  # plaintext password for update only
    bio: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)

class UserPublic(SQLModel):
    id: int
    username: str
    display_name: str
    bio: Optional[str] = None
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class UserWithCounts(UserPublic):
    recipe_count: int = 0
    favorite_count: int = 0
    review_count: int = 0
    
    model_config = ConfigDict(from_attributes=True)

# Simplified version without nested relationships to avoid validation issues
class UserWithDetails(SQLModel):
    id: int
    username: str
    display_name: str
    bio: Optional[str] = None
    created_at: datetime
    recipe_count: int = 0
    favorite_count: int = 0
    review_count: int = 0
    
    model_config = ConfigDict(from_attributes=True)