from .auths import router as auth_router
from .recipes import router as recipe_router
from .reviews import router as review_router
from .users import router as user_router

# List of all APIRouter instances to be registered by the main application
routers = [
    auth_router,
    recipe_router,
    review_router,
    user_router,
]
