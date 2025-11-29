from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List


class Ingredient(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str

    recipes: List["RecipeIngredient"] = Relationship(back_populates="ingredient")


class RecipeIngredient(SQLModel, table=True):
    recipe_id: int = Field(foreign_key="recipe.id", primary_key=True)
    ingredient_id: int = Field(foreign_key="ingredient.id", primary_key=True)
    quantity: Optional[str] = None
    ord: Optional[int] = None

    # BOTH relationships must be defined for SQLModel to work properly
    recipe: "Recipe" = Relationship(back_populates="ingredients")
    ingredient: "Ingredient" = Relationship(back_populates="recipes")
    
# from sqlmodel import SQLModel, Field, Relationship
# from typing import Optional, List


# class Ingredient(SQLModel, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     name: str

#     recipes: List["RecipeIngredient"] = Relationship(back_populates="ingredient")


# class RecipeIngredient(SQLModel, table=True):
#     recipe_id: int = Field(foreign_key="recipe.id", primary_key=True)
#     ingredient_id: int = Field(foreign_key="ingredient.id", primary_key=True)
#     quantity: Optional[str] = None
#     ord: Optional[int] = None

#     recipe: "Recipe" = Relationship(back_populates="ingredients")
#     # ingredient: "Ingredient" = Relationship(back_populates="recipes") prob needs to be deleted recheck later