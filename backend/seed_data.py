"""
Run this script to seed your database with sample data
Usage: python seed_data.py
"""

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
        # Check if data already exists
        existing_users = session.exec(select(User)).first()
        if existing_users:
            print("Database already contains data. Skipping seed.")
            return
        
        print("Seeding database...")
        
        # Create cuisines that match frontend expectations
        cuisines = [
            Cuisine(name="Asian"),
            Cuisine(name="Italian"),
            Cuisine(name="American"),
            Cuisine(name="Mediterranean"),
            Cuisine(name="French"),
            Cuisine(name="Various"),
            Cuisine(name="Mexican"),
            Cuisine(name="Indian"),
            Cuisine(name="Chinese"),
            Cuisine(name="Japanese")
        ]
        for cuisine in cuisines:
            session.add(cuisine)
        session.commit()
        print(f"✓ Created {len(cuisines)} cuisines")
        
        # Create users with proper password hashing
        users = [
            User(
                username="sarah",
                display_name="Sarah Chen",
                email="sarah@example.com",
                password_hash=pwd_context.hash("p123"),
                bio="Tea enthusiast and recipe creator passionate about Asian-inspired dishes"
            ),
            User(
                username="marco",
                display_name="Marco Rossi",
                email="marco@example.com",
                password_hash=pwd_context.hash("p123"),
                bio="Italian chef passionate about pasta and authentic Italian cuisine"
            ),
            User(
                username="emma",
                display_name="Emma Baker",
                email="emma@example.com",
                password_hash=pwd_context.hash("p123"),
                bio="Professional pastry chef specializing in decadent desserts"
            ),
            User(
                username="chef",
                display_name="Head Chef",
                email="chef@example.com",
                password_hash=pwd_context.hash("p123"),
                bio="Culinary expert with 20 years of experience across multiple cuisines"
            )
        ]
        for user in users:
            session.add(user)
        session.commit()
        print(f"✓ Created {len(users)} users")
        
        # Create recipes with proper image URLs and matching frontend structure
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
            ),
            Recipe(
                title="Ceremonial Matcha Latte",
                description="A traditional Japanese matcha experience with premium ceremonial grade powder. Smooth, creamy, and perfectly balanced.",
                image_url="https://images.unsplash.com/photo-1627769124375-8f797bb17140?w=1080",
                prep_time=5,
                cook_time=5,
                servings=1,
                difficulty="Easy",
                cuisine_id=9,  # Japanese
                user_id=1  # Sarah
            ),
            Recipe(
                title="Classic Tiramisu",
                description="Authentic Italian tiramisu with layers of coffee-soaked ladyfingers and mascarpone cream. A heavenly dessert that melts in your mouth.",
                image_url="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=1080",
                prep_time=30,
                cook_time=0,
                servings=8,
                difficulty="Medium",
                cuisine_id=2,  # Italian
                user_id=2  # Marco
            ),
            Recipe(
                title="Thai Green Curry",
                description="Aromatic and spicy Thai green curry with coconut milk, vegetables, and fragrant herbs. A taste of authentic Thai cuisine.",
                image_url="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1080",
                prep_time=20,
                cook_time=30,
                servings=4,
                difficulty="Medium",
                cuisine_id=1,  # Asian
                user_id=4  # Chef
            ),
            Recipe(
                title="French Croissants",
                description="Buttery, flaky croissants made with traditional French lamination technique. Worth every moment of the process.",
                image_url="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1080",
                prep_time=180,  # 3 hours
                cook_time=20,
                servings=12,
                difficulty="Hard",
                cuisine_id=5,  # French
                user_id=3  # Emma
            )
        ]
        for recipe in recipes:
            session.add(recipe)
        session.commit()
        print(f"✓ Created {len(recipes)} recipes")
        
        # Create diverse reviews
        reviews = [
            # Reviews for Matcha Cookies (recipe_id=1)
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
                comment="As a matcha lover, these cookies are amazing! The texture is perfect.",
                user_id=4,
                recipe_id=1
            ),
            # Reviews for Fresh Pasta (recipe_id=2)
            Review(
                rating=5,
                comment="Best pasta I've ever made! The texture is amazing and it's surprisingly easy once you get the hang of it.",
                user_id=1,
                recipe_id=2
            ),
            Review(
                rating=5,
                comment="Incredible! This recipe changed my life. Fresh pasta is so much better than dried.",
                user_id=3,
                recipe_id=2
            ),
            # Reviews for Chocolate Cake (recipe_id=3)
            Review(
                rating=5,
                comment="This cake was the star of my birthday party! Everyone asked for the recipe.",
                user_id=1,
                recipe_id=3
            ),
            Review(
                rating=5,
                comment="Decadent and rich! The ganache is perfect. Worth every calorie.",
                user_id=2,
                recipe_id=3
            ),
            # Reviews for Buddha Bowl (recipe_id=4)
            Review(
                rating=4,
                comment="Healthy and delicious! I love how colorful and nutritious this bowl is.",
                user_id=2,
                recipe_id=4
            ),
            Review(
                rating=5,
                comment="My new favorite lunch! So fresh and satisfying.",
                user_id=3,
                recipe_id=4
            ),
            # Reviews for Sourdough Bread (recipe_id=5)
            Review(
                rating=5,
                comment="The best sourdough I've made! Took time but absolutely worth it.",
                user_id=1,
                recipe_id=5
            ),
            # Reviews for Stir Fry (recipe_id=6)
            Review(
                rating=4,
                comment="Quick and easy weeknight dinner! Love the sauce combination.",
                user_id=3,
                recipe_id=6
            ),
            # Reviews for Matcha Latte (recipe_id=7)
            Review(
                rating=5,
                comment="Perfect matcha latte! Better than any coffee shop.",
                user_id=2,
                recipe_id=7
            ),
            Review(
                rating=5,
                comment="So smooth and creamy. This is my morning ritual now!",
                user_id=4,
                recipe_id=7
            ),
            # Reviews for Tiramisu (recipe_id=8)
            Review(
                rating=5,
                comment="Authentic Italian tiramisu! Tastes just like in Rome.",
                user_id=1,
                recipe_id=8
            ),
            # Reviews for Thai Curry (recipe_id=9)
            Review(
                rating=5,
                comment="Amazing flavors! The curry paste makes all the difference.",
                user_id=2,
                recipe_id=9
            ),
            # Reviews for Croissants (recipe_id=10)
            Review(
                rating=4,
                comment="Challenging but rewarding! The lamination technique is tricky but worth learning.",
                user_id=1,
                recipe_id=10
            )
        ]
        for review in reviews:
            session.add(review)
        session.commit()
        print(f"✓ Created {len(reviews)} reviews")
        
        print("\n✅ Database seeded successfully!")
        print("\n" + "="*60)
        print("SAMPLE LOGIN CREDENTIALS")
        print("="*60)
        print("\n📧 User Accounts:")
        print("   • Username: sarah    | Password: p123")
        print("   • Username: marco    | Password: p123")
        print("   • Username: emma     | Password: p123")
        print("   • Username: chef     | Password: p123")
        print("\n" + "="*60)
        print("📊 Database Summary:")
        print("="*60)
        print(f"   ✓ {len(users)} Users")
        print(f"   ✓ {len(cuisines)} Cuisines")
        print(f"   ✓ {len(recipes)} Recipes")
        print(f"   ✓ {len(reviews)} Reviews")
        print("="*60)
        print("\n🚀 Next steps:")
        print("   1. Start the backend:  uvicorn app.main:app --reload")
        print("   2. Start the frontend: npm run dev (in front folder)")
        print("   3. Visit: http://localhost:5173")
        print("   4. API docs: http://localhost:8000/docs")
        print("\n💡 Tip: Login with any user above to create recipes and reviews!")
        print("="*60 + "\n")

if __name__ == "__main__":
    seed_database()