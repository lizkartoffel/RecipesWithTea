# from .user_schema import ReadUser, CreateUser, UpdateUser, UserPublic, UserWithRecipes, UserWithCounts, UserWithDetails, LoginData, Token, TokenData
# from .recipe_schema import ReadRecipeBase, CreateRecipeBase, UpdateRecipeBase
# from .review_schema import ReadReviewBase, createReviewBase
# #from .favorite_schema import ReadFavoriteBase, CreateFavoriteBase, UpdateFavoriteBase
# from .ingredient_schema import ReadRecipeIngredient


# __all__ = [
#     "ReadUser", "CreateUser", "UpdateUser", "UserPublic", "UserWithRecipes", 
#     "UserWithCounts", "UserWithDetails", "LoginData", "Token", "TokenData",
#     "ReadRecipeBase", "CreateRecipeBase", "UpdateRecipeBase",
#     "ReadReviewBase", "createReviewBase", 
#     "ReadRecipeIngredient"
# ]

# Expose the main schemas from their respective files so they can be imported
# directly from the 'schemas' package (e.g., 'from schemas import ReadRecipeBase').

# --- Core Schemas ---
from .user_schema import (
    ReadUser, CreateUser, UpdateUser, UserPublic, UserWithRecipes, 
    UserWithCounts, UserWithDetails, LoginData, Token, TokenData
)

from .recipe_schema import ReadRecipeBase, CreateRecipeBase, UpdateRecipeBase

# --- Relationship Schemas (Aliasing for Forward References) ---

# Alias ReadReviewBase to ReadReview to match the string forward reference ("ReadReview")
try:
    from .review_schema import ReadReviewBase as ReadReview, CreateReviewBase
except ImportError:
    # Use dummy classes if the file is not yet created, preventing a crash
    class ReadReview: pass
    class CreateReviewBase: pass


# Alias ReadFavoriteBase to ReadFavorite to match the string forward reference ("ReadFavorite")
try:
    from .favorite_schema import ReadFavoriteBase as ReadFavorite, CreateFavoriteBase, UpdateFavoriteBase
except ImportError:
    # Use dummy classes if the file is not yet created
    class ReadFavorite: pass
    class CreateFavoriteBase: pass
    class UpdateFavoriteBase: pass

# Other Schemas
try:
    from .ingredient_schema import ReadRecipeIngredient
except ImportError:
    class ReadRecipeIngredient: pass
    
# try:
#     from .tag_schema import ReadTag # Assuming ReadTag is the primary schema
# except ImportError:
#     class ReadTag: pass

# --- Final Type Resolution ---
# 1. Update forward references for relationship fields:
UserWithRecipes.update_forward_refs(
    ReadRecipeBase=ReadRecipeBase,
    ReadFavorite=ReadFavorite,
    ReadReview=ReadReview
)
UserWithDetails.update_forward_refs(
    ReadRecipeBase=ReadRecipeBase,
    ReadFavorite=ReadFavorite,
    ReadReview=ReadReview
    
)

# 2. FIX for PydanticUndefinedType Error: Manually rebuild schemas that inherit 
# or use nested definitions to resolve any remaining internal references.

def rebuild_user_schemas():
    """Forces Pydantic to rebuild user schemas to resolve inheritance and complex references."""
    ReadUser.model_rebuild()
    UserPublic.model_rebuild()
    UserWithCounts.model_rebuild()
    UserWithRecipes.model_rebuild()
    UserWithDetails.model_rebuild()

rebuild_user_schemas()


# Optional: Define __all__ to control what * is exposed 
__all__ = [
    "ReadUser", "CreateUser", "UpdateUser", "UserPublic", "UserWithRecipes", 
    "UserWithCounts", "UserWithDetails", "LoginData", "Token", "TokenData",
    "ReadRecipeBase", "CreateRecipeBase", "UpdateRecipeBase",
    "ReadReviewBase", "CreateReviewBase", 
    "ReadFavoriteBase", "CreateFavoriteBase", "UpdateFavoriteBase",
    "ReadRecipeIngredient"
]