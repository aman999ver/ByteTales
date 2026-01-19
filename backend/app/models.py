from pydantic import BaseModel, Field, EmailStr, BeforeValidator, ConfigDict
from typing import Optional, List, Annotated

# Helper to map MongoDB _id to id
PyObjectId = Annotated[str, BeforeValidator(str)]

class StudentBase(BaseModel):
    name: str
    email: EmailStr

class StudentCreate(StudentBase):
    password: str
    face_encoding: Optional[List[float]] = None

class StudentLogin(BaseModel):
    email: str
    password: str

class StudentDB(StudentBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    hashed_password: str
    face_encoding: Optional[List[float]] = None
    role: str = "student"
    points: int = 0
    avatar: Optional[str] = None # Added avatar field
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True)

class StudentUpdate(BaseModel):
    avatar: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class StoryPart(BaseModel):
    title: str
    content: str
    video_url: Optional[str] = None
    quiz_id: Optional[str] = None

class Story(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    description: str
    parts: List[StoryPart] = []
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True)

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    correct_answer: int

class Quiz(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    story_part_id: str
    questions: List[QuizQuestion]
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True)
