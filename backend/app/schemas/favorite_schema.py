from __future__ import annotations

from sqlmodel import SQLModel
from pydantic import ConfigDict


class ReadFavoriteBase(SQLModel):
    user_id: int
    recipe_id: int

    model_config = ConfigDict(from_attributes=True)

class CreateFavoriteBase(SQLModel):
    user_id: int
    recipe_id: int

    model_config = ConfigDict(from_attributes=True)
 

class UpdateFavoriteBase(SQLModel):
    user_id: int
    recipe_id: int

    model_config = ConfigDict(from_attributes=True)


__all__ = ["ReadFavoriteBase", "CreateFavoriteBase", "UpdateFavoriteBase"]