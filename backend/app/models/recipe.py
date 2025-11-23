from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from datetime import datetime

from models import *

class Recipe(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    image_url: str
    prep_time: Optional[int] = None
    cook_time: Optional[int] = None
    servings: Optional[int] = None
    difficulty: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    cuisine_id: int = Field(foreign_key="cuisine.id")
    cuisine: "Cuisine" = Relationship(back_populates="recipes")

    user_id: int = Field(foreign_key="user.id")
    author: "User" = Relationship(back_populates="recipes")

    ingredients: List["RecipeIngredient"] = Relationship(back_populates="recipe")
    instructions: List["Instruction"] = Relationship(back_populates="recipe")
    reviews: List["Review"] = Relationship(back_populates="recipe")
    favorites: List["Favorite"] = Relationship(back_populates="recipe")
    diets: List["RecipeDiet"] = Relationship(back_populates="recipe")
    allergies: List["RecipeAllergy"] = Relationship(back_populates="recipe")
    tags: List["RecipeTag"] = Relationship(back_populates="recipe")