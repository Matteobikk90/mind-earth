import uuid
from datetime import datetime, timezone
from typing import Optional

from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str
    name: Optional[str]
    hashed_password: Optional[str]
    provider: str = "local"
    provider_id: Optional[str]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
