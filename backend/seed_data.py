"""
Run this script to seed your database with sample data
Usage: python seed_data.py
"""

#uvicorn app.main:app --reload

from sqlmodel import Session, select
from passlib.context import CryptContext
from app.core.database import engine, createDB
from app.models.user import User
from app.models.recipe import Recipe
from app.models.cuisine import Cuisine
from app.models.review import Review
from datetime import datetime

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_database():
    # Create tables
    print("Creating database tables...")
    createDB()
    
    with Session(engine) as session:
        # Check if data already exists - using session.exec() instead of query()
        existing_users = session.exec(select(User)).first()
        if existing_users:
            print("Database already contains data. Skipping seed.")
            return
        
        print("Seeding database...")
        
        # Create cuisines
        cuisines = [
            Cuisine(name="Asian"),
            Cuisine(name="Italian"),
            Cuisine(name="American"),
            Cuisine(name="Mediterranean"),
            Cuisine(name="French"),
            Cuisine(name="Various")
        ]
        for cuisine in cuisines:
            session.add(cuisine)
        session.commit()
        print(f"✓ Created {len(cuisines)} cuisines")
        
        # Create users
        users = [
            User(
                username="sarah",
                display_name="Sarah Chen",
                email="sarah@example.com",
                password_hash=pwd_context.hash("p123"),
                bio="Tea enthusiast and recipe creator"
            ),
            User(
                username="marco",
                display_name="Marco Rossi",
                email="marco@example.com",
                password_hash=pwd_context.hash("p123"),
                bio="Italian chef passionate about pasta"
            ),
            User(
                username="emma",
                display_name="Emma Baker",
                email="emma@example.com",
                password_hash=pwd_context.hash("p123"),
                bio="Professional pastry chef"
            )
        ]
        for user in users:
            session.add(user)
        session.commit()
        print(f"✓ Created {len(users)} users (password: p123)")
        
        # Create recipes
        recipes = [
            Recipe(
                title="Matcha Green Tea Cookies",
                description="Delicate, buttery cookies infused with premium matcha powder and a hint of vanilla. Perfect for afternoon tea or as a light dessert.",
                image_url="https://images.unsplash.com/photo-1559951742-948d2e2c86f4?w=1080",
                prep_time=15,
                cook_time=20,
                servings=24,
                difficulty="Easy",
                cuisine_id=1,  # Asian
                user_id=1  # Sarah
            ),
            Recipe(
                title="Homemade Fresh Pasta",
                description="Traditional Italian pasta made from scratch with just eggs, flour, and a pinch of salt. Silky smooth texture that pairs perfectly with any sauce.",
                image_url="https://images.unsplash.com/photo-1564813227527-a99b83712e45?w=1080",
                prep_time=45,
                cook_time=3,
                servings=4,
                difficulty="Medium",
                cuisine_id=2,  # Italian
                user_id=2  # Marco
            ),
            Recipe(
                title="Decadent Chocolate Cake",
                description="Rich, moist chocolate cake with layers of smooth chocolate ganache. This indulgent dessert is perfect for special occasions.",
                image_url="https://images.unsplash.com/photo-1636589314668-bf6a924cd353?w=1080",
                prep_time=30,
                cook_time=35,
                servings=12,
                difficulty="Hard",
                cuisine_id=3,  # American
                user_id=3  # Emma
            ),
            Recipe(
                title="Rainbow Buddha Bowl",
                description="A vibrant, nutritious bowl packed with fresh vegetables, quinoa, and a creamy tahini dressing. Perfect for a healthy lunch or dinner.",
                image_url="https://images.unsplash.com/photo-1643750182373-b4a55a8c2801?w=1080",
                prep_time=20,
                cook_time=25,
                servings=2,
                difficulty="Easy",
                cuisine_id=4,  # Mediterranean
                user_id=1  # Sarah
            ),
            Recipe(
                title="Artisan Sourdough Bread",
                description="Traditional sourdough bread with a perfect crust and tangy flavor. This recipe requires patience but delivers exceptional results.",
                image_url="https://images.unsplash.com/photo-1614936686168-fe496ca37dc3?w=1080",
                prep_time=1440,  # 24 hours
                cook_time=45,
                servings=8,
                difficulty="Hard",
                cuisine_id=5,  # French
                user_id=2  # Marco
            ),
            Recipe(
                title="Asian Vegetable Stir Fry",
                description="Quick and flavorful stir fry with crisp vegetables and a savory sauce. Ready in under 15 minutes for a perfect weeknight meal.",
                image_url="https://images.unsplash.com/photo-1614955177711-2540ad25432b?w=1080",
                prep_time=15,
                cook_time=10,
                servings=4,
                difficulty="Easy",
                cuisine_id=1,  # Asian
                user_id=1  # Sarah
            )
        ]
        for recipe in recipes:
            session.add(recipe)
        session.commit()
        print(f"✓ Created {len(recipes)} recipes")
        
        # Create reviews
        reviews = [
            Review(
                rating=5,
                comment="Absolutely delicious! The matcha flavor is perfect and not too overpowering. Will definitely make again.",
                user_id=2,
                recipe_id=1
            ),
            Review(
                rating=4,
                comment="Great recipe! My kids loved these cookies. I added a bit more sugar to make them sweeter.",
                user_id=3,
                recipe_id=1
            ),
            Review(
                rating=5,
                comment="Best pasta I've ever made! The texture is amazing and it's surprisingly easy once you get the hang of it.",
                user_id=1,
                recipe_id=2
            ),
            Review(
                rating=5,
                comment="This cake was the star of my birthday party! Everyone asked for the recipe.",
                user_id=1,
                recipe_id=3
            ),
            Review(
                rating=4,
                comment="Healthy and delicious! I love how colorful and nutritious this bowl is.",
                user_id=2,
                recipe_id=4
            )
        ]
        for review in reviews:
            session.add(review)
        session.commit()
        print(f"✓ Created {len(reviews)} reviews")
        
        print("\n✅ Database seeded successfully!")
        print("\nSample users:")
        print("  Username: sarah, Password: password123")
        print("  Username: marco, Password: password123")
        print("  Username: emma, Password: password123")

if __name__ == "__main__":
    seed_database()