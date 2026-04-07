from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

with engine.connect() as connection:
    print("Adding 'contact_email' column to 'books' table...")
    try:
        connection.execute(text("ALTER TABLE books ADD COLUMN contact_email VARCHAR(100)"))
        connection.commit()
        print("✅ Column added successfully!")
    except Exception as e:
        print(f"❌ Error adding column: {e}")
