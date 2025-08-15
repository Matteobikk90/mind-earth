from app.utils.constants import DATABASE_URL
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    print("📦 Initializing DB connection...")


def close_db():
    print("🔌 Closing DB connection...")
    engine.dispose()
