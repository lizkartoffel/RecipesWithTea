from .user import User
from .recipe import Recipe 
from .review import Review 
from .favorite import Favorite 
from .ingredient import Ingredient , RecipeIngredient
from .instructions import Instruction 
from .tag import Tag , RecipeTag 
from .cuisine import Cuisine     
from .diet import Diet, RecipeDiet
from .allergy import Allergy, RecipeAllergy     #MAKE CLESANER LATER  WINGRIOGNOGL

__all__ = ["User", "Recipe", "Review", "Favorite", "Tag", "Ingredient", "RecipeTag", "RecipeIngredient", "Cuisine", "Diet", "RecipeDiet", "Allergy", "RecipeAllergy", "Instruction"]