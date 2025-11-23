from datetime import datetime
from typing import List, Optional
from sqlmodel import SQLModel
from models import *

class ReadRecipeIngredient(SQLModel):
    id: int
    name: str
    quantity: Optional[float]
    unit: Optional[str]
    
    class Config:
        orm_mode = True