"""
Complete fresh start script - fixes all issues and rebuilds database
Usage: python fresh_start.py
"""
import os
import sys
import shutil

def fresh_start():
    print("🔄 Starting fresh database rebuild...\n")
    
    # 1. Remove database
    db_file = "database.db"
    if os.path.exists(db_file):
        print(f"📁 Removing old database: {db_file}")
        os.remove(db_file)
        print("   ✅ Database removed\n")
    
    # 2. Clear Python cache
    print("🗑️  Clearing Python cache...")
    cache_dirs = []
    for root, dirs, files in os.walk("."):
        if "__pycache__" in dirs:
            cache_path = os.path.join(root, "__pycache__")
            cache_dirs.append(cache_path)
    
    for cache_dir in cache_dirs:
        shutil.rmtree(cache_dir, ignore_errors=True)
    
    print(f"   ✅ Cleared {len(cache_dirs)} cache directories\n")
    
    # 3. Reimport and create database
    print("📦 Importing models...")
    try:
        # Force reimport of all modules
        for module in list(sys.modules.keys()):
            if module.startswith('app.'):
                del sys.modules[module]
        
        from app.core.database import createDB
        print("   ✅ Models imported\n")
        
        print("🔨 Creating database tables...")
        createDB()
        print("   ✅ Database tables created\n")
        
        print("✅ Fresh start complete!")
        print("\n📝 Next steps:")
        print("   1. Run: python seed_data.py")
        print("   2. Start server: uvicorn app.main:app --reload")
        print("   3. Visit: http://localhost:8000/docs")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nPlease check:")
        print("1. All model files have correct relationships")
        print("2. All imports are correct")
        print("3. No typos in model names")
        return False
    
    return True

if __name__ == "__main__":
    success = fresh_start()
    sys.exit(0 if success else 1)