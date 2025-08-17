from datetime import timedelta

from app.config.db import get_session
from app.models.user import User
from app.utils.security import (ACCESS_TOKEN_EXPIRE_MINUTES,
                                create_access_token, hash_password,
                                verify_password)
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlmodel import Session, select


class AuthRequest(BaseModel):
    email: str
    password: str


router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login")
def login(payload: AuthRequest, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == payload.email)).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register")
def register(payload: AuthRequest, db: Session = Depends(get_session)):
    existing = db.exec(select(User).where(User.email == payload.email)).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    user = User(
        email=payload.email,
        hashed_password=hash_password(payload.password),
        name=payload.email.split("@")[0],
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "email": user.email}
