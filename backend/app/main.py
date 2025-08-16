from contextlib import asynccontextmanager

from app.api import auth, population, users
from app.config.db import close_db, init_db
from app.utils.constants import ALLOW_ORIGINS
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    app.state.started = True
    yield
    close_db()


app = FastAPI(lifespan=lifespan)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(population.router)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
