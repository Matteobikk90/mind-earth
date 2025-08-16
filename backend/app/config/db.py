from typing import Generator

from app.utils.constants import DATABASE_URL
from sqlmodel import Session, create_engine

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set! Check your .env file")

engine = create_engine(DATABASE_URL, echo=True)


def get_session() -> Generator[Session, None, None]:
    """Dependency for FastAPI routes."""
    with Session(engine) as session:
        yield session


def init_db():
    from app.models.user import User
    from sqlmodel import SQLModel

    print("📦 Creating DB tables (if not exist)...")
    _ = User
    SQLModel.metadata.create_all(engine)


def close_db():
    print("🔌 Closing DB connection...")
    engine.dispose()
