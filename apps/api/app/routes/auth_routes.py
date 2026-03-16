from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from app.schemas.auth_schema import SignupSchema, LoginSchema
from app.models.user import User
from app.db.database import SessionLocal
from app.core.hashing import hash_password, verify_password
from app.core.security import create_access_token

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/signup")
def signup(data: SignupSchema):

    db: Session = next(get_db())

    if data.password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(data.password)

    new_user = User(
        full_name=data.full_name,
        email=data.email,
        password=hashed_password,
        company_name=data.company_name,
        role=data.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}


@router.post("/login")
def login(data: LoginSchema):

    db: Session = next(get_db())

    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"user_id": user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }