from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.database import engine
from server import models
from server.apis.books import router as books_router
from server.apis.user import router as user_router

print("--- STARTING BOOK-LINK API ---")

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Book-Link API")

@app.middleware("http")
async def log_requests(request, call_next):
    print(f"Log: {request.method} {request.url.path}")
    response = await call_next(request)
    return response

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(books_router)

print(f"Routes registered: {[r.path for r in app.routes]}")