from fastapi import APIRouter, HTTPException, Depends, status
from ..database import db
from ..models import Story, StoryPart, StudentDB, Quiz
from ..auth import get_current_user
from typing import List
from bson import ObjectId
from pydantic import BaseModel
from pymongo import ReturnDocument

router = APIRouter(prefix="/stories", tags=["stories"])

# Helper dependency for admin check
def get_current_admin(user: StudentDB = Depends(get_current_user)):
    if user.role != "admin":
         raise HTTPException(
             status_code=status.HTTP_403_FORBIDDEN,
             detail="You do not have admin privileges"
         )
    return user

# Basic Story CRUD
@router.get("", response_model=List[Story])
async def get_stories():
    stories = await db.stories.find().to_list(100)
    return stories

@router.post("", response_model=Story)
async def create_story(story: Story, admin: StudentDB = Depends(get_current_admin)):
    new_story = await db.stories.insert_one(story.model_dump(by_alias=True, exclude={"id"}))
    created_story = await db.stories.find_one({"_id": new_story.inserted_id})
    return created_story

@router.get("/{story_id}", response_model=Story)
async def get_story(story_id: str):
    try:
        story = await db.stories.find_one({"_id": ObjectId(story_id)})
    except:
        raise HTTPException(status_code=404, detail="Invalid ID format")
        
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    return story

@router.delete("/{story_id}")
async def delete_story(story_id: str, admin: StudentDB = Depends(get_current_admin)):
    result = await db.stories.delete_one({"_id": ObjectId(story_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Story not found")
    return {"message": "Story deleted"}

# Parts Management
@router.put("/{story_id}/parts", response_model=Story)
async def add_story_part(story_id: str, part: StoryPart, admin: StudentDB = Depends(get_current_admin)):
    result = await db.stories.find_one_and_update(
        {"_id": ObjectId(story_id)},
        {"$push": {"parts": part.model_dump(exclude_defaults=True)}},
        return_document=ReturnDocument.AFTER
    )
    if not result:
        raise HTTPException(status_code=404, detail="Story not found")
    return result

@router.put("/{story_id}/parts/{part_index}", response_model=Story)
async def update_story_part(story_id: str, part_index: int, part: StoryPart, admin: StudentDB = Depends(get_current_admin)):
    story = await db.stories.find_one({"_id": ObjectId(story_id)})
    if not story or not story.get("parts"):
         raise HTTPException(status_code=404, detail="Story or parts not found")
    
    # Check index bounds
    if part_index < 0 or part_index >= len(story["parts"]):
        raise HTTPException(status_code=400, detail="Invalid part index")

    # Update specific index using dot notation "parts.0", "parts.1", etc.
    # Note: This relies on part_index being stable (no race conditions with concurrent deletes)
    
    await db.stories.update_one(
        {"_id": ObjectId(story_id)},
        {"$set": {f"parts.{part_index}": part.model_dump(exclude_defaults=True)}}
    )
    
    return await db.stories.find_one({"_id": ObjectId(story_id)})

@router.delete("/{story_id}/parts/{part_index}", response_model=Story)
async def delete_story_part(story_id: str, part_index: int, admin: StudentDB = Depends(get_current_admin)):
    story = await db.stories.find_one({"_id": ObjectId(story_id)})
    if not story or not story.get("parts"):
         raise HTTPException(status_code=404, detail="Story or parts not found")
    
    parts = story["parts"]
    if part_index < 0 or part_index >= len(parts):
        raise HTTPException(status_code=400, detail="Invalid part index")
        
    parts.pop(part_index)
    
    await db.stories.update_one(
        {"_id": ObjectId(story_id)},
        {"$set": {"parts": parts}}
    )
    return await db.stories.find_one({"_id": ObjectId(story_id)})

# Quiz System
class QuizSubmission(BaseModel):
    answers: List[int]

@router.post("/quizzes", response_model=Quiz)
async def create_quiz(quiz: Quiz, admin: StudentDB = Depends(get_current_admin)):
    new_quiz = await db.quizzes.insert_one(quiz.model_dump(by_alias=True, exclude={"id"}))
    created_quiz = await db.quizzes.find_one({"_id": new_quiz.inserted_id})
    return created_quiz

@router.get("/quizzes/{quiz_id}", response_model=Quiz)
async def get_quiz(quiz_id: str):
    try:
        quiz = await db.quizzes.find_one({"_id": ObjectId(quiz_id)})
    except:
        raise HTTPException(status_code=404, detail="Invalid Quiz ID")
        
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz

@router.post("/quizzes/{quiz_id}/submit")
async def submit_quiz(quiz_id: str, submission: QuizSubmission, current_user: StudentDB = Depends(get_current_user)):
    quiz = await db.quizzes.find_one({"_id": ObjectId(quiz_id)})
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    score = 0
    points_per_q = 10
    correct_count = 0
    
    for i, q in enumerate(quiz['questions']):
        if i < len(submission.answers):
            if submission.answers[i] == q['correct_answer']:
                score += points_per_q
                correct_count += 1
    
    if score > 0:
        await db.students.update_one(
            {"email": current_user.email},
            {
                "$inc": {"points": score},
                "$addToSet": {"completed_quizzes": quiz_id} 
            }
        )
        
    return {
        "score": score, 
        "correct_count": correct_count, 
        "total_questions": len(quiz['questions']),
        "points_awarded": score
    }

from ..utils import update_streak

# ... imports ...

@router.post("/{story_id}/complete")
async def complete_story(story_id: str, current_user: StudentDB = Depends(get_current_user)):
    # Verify story exists
    if not await db.stories.find_one({"_id": ObjectId(story_id)}):
        raise HTTPException(status_code=404, detail="Story not found")

    # Update Streak
    await update_streak(current_user.email)

    await db.students.update_one(
        {"email": current_user.email},
        {
            "$addToSet": {"completed_stories": story_id},
            "$inc": {"points": 100} # Award 100 XP
        }
    )
    return {"message": "Story marked as completed, +100 XP"}

@router.post("/seed")
async def seed_data():
    from ..models import QuizQuestion
    
    # Check if any story exists, if so skip? No, always allow seed for now
    # Quiz 1
    q1 = Quiz(story_part_id="placeholder", questions=[
        QuizQuestion(question="What are the two numbers computers use?", options=["1 and 2", "0 and 1", "5 and 10"], correct_answer=1),
        QuizQuestion(question="What is a 'bit'?", options=["A byte", "Binary Digit", "A bug"], correct_answer=1)
    ])
    res_q1 = await db.quizzes.insert_one(q1.model_dump(by_alias=True, exclude={"id"}))
    q1_id = str(res_q1.inserted_id)

    # Story
    s1 = Story(title="The Binary Forest", description="Learn about Bits and Bytes!", parts=[
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
    ])
    await db.stories.insert_one(s1.model_dump(by_alias=True, exclude={"id"}))
    
    return {"message": "Seeded data successfully"}
