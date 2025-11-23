from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from datetime import datetime

from models import *

class User(SQLModel, table=True):

    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    display_name: str
    email: str
    password_hash: str
    bio: Optional[str] = None
    
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # relationships (point to association/other models)
    recipes: List["Recipe"] = Relationship(back_populates="author") #M:1
    reviews: List["Review"] = Relationship(back_populates="user") #1:M
    favorites: List["Favorite"] = Relationship(back_populates="user") #M:M
    
# regular foreign keys make a new colum in the DB 
# this doesnt tell swlmodel how this table connects to others 
# unlike Relationship which links them, creates virtual Python attributes that link models together. 
# and makes navigation easier

# recipes
# The attribute name on the User model.
# In Python code you will access user.recipes to get that user’s recipes.

# List["Recipe"]
# this attribute holds a list / collection of things.
# ["Recipe"] is a forward reference (string) to the Recipe class. We use a string because Recipe might be defined later in the file or another module.
# Together List["Recipe"] tells the editor/type-checker and SQLModel that recipes is a collection of Recipe objects (one-to-many).

# back_populates="author"
# names the attribute on the other model that “points back” to this model.
# In this example, it assumes your Recipe model has an attribute named author defined like:
# author: "User" = Relationship(back_populates="recipes")
# user_id: int = Field(foreign_key="user.id")
# back_populates makes the relationship bidirectional — you can do user.recipes and recipe.author and SQLAlchemy will keep both sides in sync.