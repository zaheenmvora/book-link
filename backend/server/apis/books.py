from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas, auth
from .user import get_current_user

router = APIRouter(prefix="/books", tags=["books"])

@router.post("/", response_model=schemas.BookOut)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_book = models.Book(**book.dict(), owner_id=current_user.id)
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book

@router.get("/", response_model=List[schemas.BookOut])
def get_books(db: Session = Depends(get_db)):
    return db.query(models.Book).all()

@router.get("/{book_id}", response_model=schemas.BookOut)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.patch("/{book_id}", response_model=schemas.BookOut)
def update_book(book_id: int, book_update: schemas.BookUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")
    if db_book.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this book")
    
    update_data = book_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_book, key, value)
    
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

@router.delete("/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")
    if db_book.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this book")
    
    db.delete(db_book)
    db.commit()
    return {"message": "Book deleted successfully"}
