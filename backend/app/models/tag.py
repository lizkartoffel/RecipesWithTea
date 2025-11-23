from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional

from models import *

class Tag(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str

    recipes: List["RecipeTag"] = Relationship(back_populates="tag")

class RecipeTag(SQLModel, table=True):
    recipe_id: int = Field(foreign_key="recipe.id", primary_key=True)
    tag_id: int = Field(foreign_key="tag.id", primary_key=True)

    # relationships to allow joins
    recipe: "Recipe" = Relationship(back_populates="tags") #M:M
    tag: "Tag" = Relationship(back_populates="recipes") #M:M


# vegetarian desert etc..