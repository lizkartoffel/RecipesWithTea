from typing import Optional
from sqlmodel import SQLModel, Field, Relationship


class Instruction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    recipe_id: int = Field(foreign_key="recipe.id")
    step_number: int
    description: str

    recipe: "Recipe" = Relationship(back_populates="instructions")