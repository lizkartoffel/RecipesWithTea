from __future__ import annotations

from datetime import datetime
from typing import List, Optional
from sqlmodel import SQLModel
from pydantic import ConfigDict

class ReadRecipeBase(SQLModel):
    id: int
    title: str
    description: Optional[str] = None
    image_url: str
    prep_time: Optional[int] = None
    cook_time: Optional[int] = None
    servings: Optional[int] = None
    difficulty: str
    created_at: datetime
    updated_at: datetime
    cuisine_id: int
    user_id: int
    
    model_config = ConfigDict(from_attributes=True)

class CreateRecipeBase(SQLModel):
    title: str
    description: Optional[str] = None
    image_url: str = "https://images.unsplash.com/photo-1627769124375-8f797bb17140"
    prep_time: Optional[int] = 0
    cook_time: Optional[int] = 0
    servings: Optional[int] = 4
    difficulty: str = "Easy"
    cuisine_id: int = 1
    user_id: int
    
    model_config = ConfigDict(from_attributes=True)

class UpdateRecipeBase(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    prep_time: Optional[int] = None
    cook_time: Optional[int] = None
    servings: Optional[int] = None
    difficulty: Optional[str] = None
    cuisine_id: Optional[int] = None
    
    model_config = ConfigDict(from_attributes=True)

class DeleteRecipeBase(SQLModel):
    id: int

    model_config = ConfigDict(from_attributes=True)


__all__ = ["ReadRecipeBase", "CreateRecipeBase", "UpdateRecipeBase", "DeleteRecipeBase"]



# class CreateRecipeBase(SQLModel):
#     title: str
#     description: str
#     cook_time: int
#     servings: int
#     cuisine_id: Optional[int]
    
#     class Config:
#         from_attributes = True
