from datetime import datetime
from typing import List, Optional
from sqlmodel import SQLModel

class CreateReviewBase(SQLModel):
    rating: int
    comment: Optional[str]
    recipe_id: int
    user_id: int

    class Config:
        orm_mode = True

class ReadReviewBase(SQLModel):
    id: int
    rating: int
    comment: Optional[str]
    created_at: datetime
    user_id: int
    recipe_id: int

    class Config:
        orm_mode = True


__all__ = ["ReadReviewBase", "CreateReviewBase"]