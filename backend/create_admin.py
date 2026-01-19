import asyncio
from app.database import db
from app.models import StudentDB
from app.auth import get_password_hash
from app.config import settings
from motor.motor_asyncio import AsyncIOMotorClient

async def create_admin():
    # Direct connection to ensure we are not dependent on app startup
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    database = client[settings.DATABASE_NAME]
    students_collection = database.students

    admin_email = "admin@bytetales.com"
    admin_pass = "admin123" # Default password

    existing_admin = await students_collection.find_one({"email": admin_email})
    if existing_admin:
        print(f"⚠️ Admin already exists: {admin_email}")
        return

    hashed_pwd = get_password_hash(admin_pass)
    
    admin_user = StudentDB(
        name="Admin Commander",
        email=admin_email,
        hashed_password=hashed_pwd,
        role="admin",
        face_encoding=None # Admin doesn't need face ID strictly
    )

    await students_collection.insert_one(admin_user.model_dump(by_alias=True, exclude={"id"}))
    print(f"✅ Admin Created Successfully!")
    print(f"📧 Email: {admin_email}")
    print(f"🔑 Password: {admin_pass}")

if __name__ == "__main__":
    asyncio.run(create_admin())
