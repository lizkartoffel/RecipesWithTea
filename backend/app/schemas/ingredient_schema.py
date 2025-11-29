from __future__ import annotations

from typing import Optional
from sqlmodel import SQLModel
from pydantic import ConfigDict

class ReadRecipeIngredient(SQLModel):
    id: int
    name: str
    quantity: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)