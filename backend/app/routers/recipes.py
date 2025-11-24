from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
#from schemas import recipe_schema
#from core import createSession

from ..models.recipe import Recipe 
from ..schemas import ReadRecipeBase, CreateRecipeBase, UpdateRecipeBase
from typing import List
from ..core.database import createSession

router = APIRouter(prefix="/recipes")

@router.post("/", response_model=ReadRecipeBase)  # create a recipe
def create_recipe(recipe: CreateRecipeBase, session: Session = Depends(createSession)):
    new_recipe = Recipe.from_orm(recipe)
    session.add(new_recipe)
    session.commit()
    session.refresh(new_recipe)
    return new_recipe

@router.get("/{recipe_id}", response_model=ReadRecipeBase)  # get recipe by id
def get_recipe(recipe_id: int, session: Session = Depends(createSession)):
    recipe = session.get(Recipe, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe   

@router.get("/", response_model=List[ReadRecipeBase])  # get all recipes
def get_all_recipes(session: Session = Depends(createSession)):
    recipes = session.exec(select(Recipe)).all()
    return recipes

@router.put("/{recipe_id}", response_model=ReadRecipeBase)  # update recipe by id
def update_recipe(recipe_id: int, recipe_data: UpdateRecipeBase, session: Session = Depends(createSession)):
    recipe = session.get(Recipe, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    for key, value in recipe_data.dict(exclude_unset=True).items():
        setattr(recipe, key, value)
    session.add(recipe)
    session.commit()
    session.refresh(recipe)
    return recipe

@router.delete("/{recipe_id}")  # delete recipe by id
def delete_recipe(recipe_id: int, session: Session = Depends(createSession)):
    recipe = session.get(Recipe, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    session.delete(recipe)
    session.commit()
    return {"message": "Recipe deleted successfully"}


