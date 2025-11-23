from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime

from models import *


class Favorite(SQLModel, table = True):
  # composite PK prevents duplicate favorites
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    recipe_id: int = Field(foreign_key="recipe.id", primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user: "User" = Relationship(back_populates="favorites") #M:M
    recipe: "Recipe" = Relationship(back_populates="favorites") #M:M