import asyncio
from app.database import db
from app.models import Story, StoryPart, StudentDB
from app.config import settings
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

async def test_delete():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db_instance = client[settings.DATABASE_NAME]
    
    print("Debug: Setup for delete test...")

    # 1. Create a dummy story with parts
    s = Story(
        title="Delete Test Story", 
        description="To be deleted", 
        parts=[
            StoryPart(title="Part 1", content="Content 1"),
            StoryPart(title="Part 2", content="Content 2"),
            StoryPart(title="Part 3", content="Content 3")
        ]
    )
    
    res = await db_instance.stories.insert_one(s.model_dump(by_alias=True, exclude={"id"}))
    story_id = res.inserted_id
    print(f"Debug: Created story {story_id}")
    
    # 2. Simulate Delete Part Logic (copying from router)
    part_index = 1 # Delete "Part 2"
    
    story = await db_instance.stories.find_one({"_id": story_id})
    parts = story["parts"]
    
    print(f"Debug: Parts before: {[p['title'] for p in parts]}")
    
    if part_index < len(parts):
        parts.pop(part_index)
        
        await db_instance.stories.update_one(
            {"_id": story_id},
            {"$set": {"parts": parts}}
        )
        print("Debug: Delete operation performed.")
    else:
        print("Debug: Index out of bounds")

    # 3. Verify
    updated = await db_instance.stories.find_one({"_id": story_id})
    print(f"Debug: Parts after: {[p['title'] for p in updated['parts']]}")
    
    # Clean up
    await db_instance.stories.delete_one({"_id": story_id})
    print("Debug: Cleanup done.")

if __name__ == "__main__":
    asyncio.run(test_delete())
