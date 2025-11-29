"""
Script to completely rebuild the database from scratch
Usage: python rebuild_db.py
"""
import os
from app.core.database import createDB

def rebuild_database():
    """Delete existing database and create fresh tables"""
    db_file = "database.db"
    
    # Delete existing database if it exists
    if os.path.exists(db_file):
        print(f"Removing existing database: {db_file}")
        os.remove(db_file)
    
    # Create fresh database tables
    print("Creating fresh database tables...")
    createDB()
    print("Database rebuilt successfully!")
    print("\nNext step: Run 'python seed_data.py' to add sample data")

if __name__ == "__main__":
    rebuild_database()