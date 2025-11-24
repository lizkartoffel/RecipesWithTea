from __future__ import annotations

from datetime import datetime
from typing import List, Optional
from sqlmodel import SQLModel

class ReadRecipeBase(SQLModel):
    id: int
    title: str
    description: str
    cooking_time: int
    servings: int
    created_at: datetime
    updated_at: datetime
    cuisine_id: Optional[int]
    
    class Config:
        orm_mode = True

# class ReadRecipeDetail(ReadRecipeBase):
#     ingredients: List["ReadRecipeIngredient"] = []
#     instructions: List["ReadInstruction"] = []
#     reviews: List["ReadReview"] = []
#     tags: List["ReadTag"] = []
#     diets: List["ReadDiet"] = []
#     allergies: List["ReadAllergy"] = []

    class Config:
        orm_mode = True
class CreateRecipeBase(SQLModel):
    title: str
    description: str
    cooking_time: int
    servings: int
    cuisine_id: Optional[int]
    
    class Config:
        orm_mode = True

class UpdateRecipeBase(SQLModel):
    title: Optional[str]
    description: Optional[str]
    cooking_time: Optional[int]
    servings: Optional[int]
    cuisine_id: Optional[int]
    
    class Config:
        orm_mode = True

class deleteRecipeBase(SQLModel):
    id: int

    class Config:
        orm_mode = True


__all__ = ["ReadRecipeBase", "ReadRecipeDetail", "CreateRecipeBase", "UpdateRecipeBase"]