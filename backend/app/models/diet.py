from typing import List, Optional
from sqlmodel import SQLModel, Field, Relationship


class Diet(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    recipes: List["RecipeDiet"] = Relationship(back_populates="diet")


class RecipeDiet(SQLModel, table=True):
    recipe_id: int = Field(foreign_key="recipe.id", primary_key=True)
    diet_id: int = Field(foreign_key="diet.id", primary_key=True)

    # relationships to allow joins
    recipe: "Recipe" = Relationship(back_populates="diets")  # M:N
    diet: "Diet" = Relationship(back_populates="recipes")  # M:N
