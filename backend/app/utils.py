from datetime import datetime, timedelta
from .database import db

async def update_streak(email: str):
    user = await db.students.find_one({"email": email})
    if not user:
        return 0

    today = datetime.utcnow().date()
    last_active_str = user.get("last_active_date")
    current_streak = user.get("streak_days", 0)

    # Convert stored string back to date object
    last_active = datetime.strptime(last_active_str, "%Y-%m-%d").date() if last_active_str else None

    new_streak = current_streak

    if last_active == today:
        # Already active today, no change
        return current_streak
    
    if last_active == today - timedelta(days=1):
        # Was active yesterday, increment streak
        new_streak += 1
    else:
        # Missed a day or first time, reset to 1
        new_streak = 1

    # Update DB
    await db.students.update_one(
        {"email": email},
        {
            "$set": {
                "streak_days": new_streak,
                "last_active_date": str(today)
            }
        }
    )
    return new_streak
