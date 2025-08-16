from app.config.db import get_session
from app.models.schemas_user import UserCreate, UserResponse
from app.models.user import User
from app.utils.security import hash_password
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

router = APIRouter(prefix="/api/users", tags=["users"])


@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    db_user = session.exec(select(User).where(User.email == user.email)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=user.email,
        name=user.name,
        hashed_password=hash_password(user.password),
        provider="local",
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user


@router.get("/", response_model=list[UserResponse])
def list_users(session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()
    return users
