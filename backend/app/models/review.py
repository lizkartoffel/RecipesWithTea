from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

from models import *

class Review(SQLModel, table = True):
    id: Optional[int] = Field(default=None, primary_key=True)
    rating: int
    comment: str
    
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user_id: int = Field(foreign_key="user.id")
    recipe_id: int = Field(foreign_key="recipe.id")

    user: "User" = Relationship(back_populates="reviews") #1:M
    recipe: "Recipe" = Relationship(back_populates="reviews") #M:1
