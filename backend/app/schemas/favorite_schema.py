from sqlmodel import SQLModel


class ReadFavoriteBase(SQLModel):
    id: int
    user_id: int
    recipe_id: int

    class Config:
        orm_mode = True

class CreateFavoriteBase(SQLModel):
    user_id: int
    recipe_id: int

    class Config:
        orm_mode = True 

class UpdateFavoriteBase(SQLModel):
    user_id: int
    recipe_id: int

    class Config:
        orm_mode = True


__all__ = ["ReadFavoriteBase", "CreateFavoriteBase", "UpdateFavoriteBase"]