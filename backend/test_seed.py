import asyncio
from app.database import db
from app.models import Story, StoryPart, Quiz, QuizQuestion
from app.config import settings
from motor.motor_asyncio import AsyncIOMotorClient

async def debug_seed():
    uri = settings.MONGODB_URI
    client = AsyncIOMotorClient(uri)
    db_instance = client[settings.DATABASE_NAME]
    
    print("Debug: Attempting to seed...")

    try:
        # Quiz 1
        q1 = Quiz(
            story_part_id="placeholder", 
            questions=[
                QuizQuestion(question="What are the two numbers computers use?", options=["1 and 2", "0 and 1", "5 and 10"], correct_answer=1),
                QuizQuestion(question="What is a 'bit'?", options=["A byte", "Binary Digit", "A bug"], correct_answer=1)
            ]
        )
        print("Debug: Quiz model created.")
        
        res_q1 = await db_instance.quizzes.insert_one(q1.model_dump(by_alias=True, exclude={"id"}))
        q1_id = str(res_q1.inserted_id)
        print(f"Debug: Quiz inserted. ID: {q1_id}")

        # Story
        s1 = Story(
            title="The Binary Forest", 
            description="Learn about Bits and Bytes!", 
            parts=[
                StoryPart(
                    title="Into the Woods", 
                    content="Computers speak a special language called Binary. It only has two words: 0 and 1! Imagine a light switch: it can be ON (1) or OFF (0).",
                    video_url="https://www.youtube.com/embed/LpuPe81bc2w"
                ),
                StoryPart(
                    title="The Bit", 
                    content="Each 0 or 1 is called a 'bit' (Binary Digit). It's the smallest piece of info!", 
                    quiz_id=q1_id,
                    video_url="https://www.youtube.com/embed/5584W7L8h08"
                )
            ]
        )
        print("Debug: Story model created.")
        
        await db_instance.stories.insert_one(s1.model_dump(by_alias=True, exclude={"id"}))
        print("✅ Seed Successful!")

    except Exception as e:
        print(f"❌ Seed Failed: {e}")

if __name__ == "__main__":
    asyncio.run(debug_seed())
