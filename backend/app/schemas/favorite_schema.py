from __future__ import annotations

from sqlmodel import SQLModel


class ReadFavoriteBase(SQLModel):
    id: int
    user_id: int
    recipe_id: int

    class Config:
        from_attributes = True

class CreateFavoriteBase(SQLModel):
    user_id: int
    recipe_id: int

    class Config:
        from_attributes = True
 

class UpdateFavoriteBase(SQLModel):
    user_id: int
    recipe_id: int

    class Config:
        from_attributes = True


__all__ = ["ReadFavoriteBase", "CreateFavoriteBase", "UpdateFavoriteBase"]