from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from ..database import db
from ..models import StudentCreate, StudentDB, Token, StudentLogin, StudentUpdate
from pydantic import BaseModel
from ..auth import get_password_hash, verify_password, create_access_token, get_current_user
from typing import List, Optional
import numpy as np

router = APIRouter(prefix="/students", tags=["students"])

class FaceLoginRequest(BaseModel):
    encoding: List[float]

# 1. Register
@router.post("/register", response_model=Token)
async def register_student(request: Request):
    try:
        data = await request.json()
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid JSON")

    try:
        student_data = StudentCreate(**data)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))
    
    if await db.students.find_one({"email": student_data.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(student_data.password)
    student = StudentDB(
        name=student_data.name,
        email=student_data.email,
        hashed_password=hashed_pwd,
        face_encoding=student_data.face_encoding
    )
    
    await db.students.insert_one(student.model_dump(by_alias=True, exclude={"id"}))
    access_token = create_access_token(data={"sub": student_data.email})
    return {"access_token": access_token, "token_type": "bearer"}

# 2. Login
@router.post("/login", response_model=Token)
async def login_student(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.students.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

# 3. Face Login
@router.post("/face-login", response_model=Token)
async def face_login(request: FaceLoginRequest):
    input_encoding = request.encoding
    if not input_encoding:
         raise HTTPException(status_code=400, detail="No face data provided")

    cursor = db.students.find({"face_encoding": {"$ne": None}})
    best_match = None
    min_dist = 0.5 
    
    async for student in cursor:
        stored_encoding = student.get("face_encoding")
        if not stored_encoding: continue
        
        dist = np.linalg.norm(np.array(stored_encoding) - np.array(input_encoding))
        
        if dist < min_dist:
            min_dist = dist
            best_match = student
            
    if best_match:
        access_token = create_access_token(data={"sub": best_match["email"]})
        return {"access_token": access_token, "token_type": "bearer"}
    
    raise HTTPException(status_code=401, detail="Face not recognized")

# 4. Get Current User
@router.get("/me", response_model=StudentDB)
async def read_users_me(current_user: StudentDB = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=StudentDB)
async def update_student_me(student_update: StudentUpdate, current_user: StudentDB = Depends(get_current_user)):
    if student_update.avatar:
        await db.students.update_one(
            {"email": current_user.email},
            {"$set": {"avatar": student_update.avatar}}
        )
        current_user.avatar = student_update.avatar
    return current_user

# 5. Get All Students (Admin)
@router.get("/", response_model=List[StudentDB])
async def get_all_students(current_user: StudentDB = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    # This endpoint caused 404 before because it might have been missing or file not loaded
    students = await db.students.find().to_list(100)
    return students
