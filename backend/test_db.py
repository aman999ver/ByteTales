import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

async def test_connection():
    uri = settings.MONGODB_URI
    print(f"Testing connection to: {uri}")
    
    try:
        client = AsyncIOMotorClient(uri)
        # Force a connection verification
        await client.admin.command('ping')
        print("✅ MongoDB Connection Successful!")
        
        db = client[settings.DATABASE_NAME]
        print(f"✅ Database '{settings.DATABASE_NAME}' selected.")
        
        # Test write
        result = await db.test_collection.insert_one({"status": "test"})
        print(f"✅ Write Test Successful! ID: {result.inserted_id}")
        
    except Exception as e:
        print(f"❌ Connection Failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_connection())
