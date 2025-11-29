from __future__ import annotations

from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel
from pydantic import ConfigDict

class CreateReviewBase(SQLModel):
    rating: int
    comment: Optional[str] = None
    recipe_id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)

class ReadReviewBase(SQLModel):
    id: int
    rating: int
    comment: Optional[str] = None
    created_at: datetime
    user_id: int
    recipe_id: int

    model_config = ConfigDict(from_attributes=True)


__all__ = ["ReadReviewBase", "CreateReviewBase"]