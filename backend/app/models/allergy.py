from typing import List, Optional
from sqlmodel import SQLModel, Field, Relationship


class Allergy(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str

    recipes: List["RecipeAllergy"] = Relationship(back_populates="allergy")

class RecipeAllergy(SQLModel, table=True):
    recipe_id: int = Field(foreign_key="recipe.id", primary_key=True)
    allergy_id: int = Field(foreign_key="allergy.id", primary_key=True)

    recipe: "Recipe" = Relationship(back_populates="allergies")
    allergy: "Allergy" = Relationship(back_populates="recipes")
