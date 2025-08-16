from contextlib import asynccontextmanager

from app.api import population, users
from app.config.db import close_db, init_db
from fastapi import FastAPI


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    app.state.started = True
    yield
    close_db()


app = FastAPI(lifespan=lifespan)

# Routers
app.include_router(users.router)
app.include_router(population.router)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
