from pydantic import BaseModel, EmailStr
from typing import Optional, List

# User Schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr
    bio: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    bio: Optional[str] = None
    profile_image: Optional[str] = None

class UserOut(UserBase):
    id: int
    profile_image: Optional[str] = None

    class Config:
        from_attributes = True

# Book Schemas
class BookBase(BaseModel):
    title: str
    author: str
    description: str
    genre: str
    price: float
    image_url: Optional[str] = None
    contact_email: Optional[EmailStr] = None

class BookCreate(BookBase):
    pass

class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    description: Optional[str] = None
    genre: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    contact_email: Optional[EmailStr] = None

class BookOut(BookBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
