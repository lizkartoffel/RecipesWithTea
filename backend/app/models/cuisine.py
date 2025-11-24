from typing import List, Optional
from sqlmodel import SQLModel, Field, Relationship


class Cuisine(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str

    recipes: List["Recipe"] = Relationship(back_populates="cuisine")