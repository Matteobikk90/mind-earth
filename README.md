# 🌍 Mind Earth

A full-stack geospatial platform built with **Next.js**, **FastAPI**, **PostgreSQL**, and **Docker**.  
Mind Earth lets you explore geo-data, population stats, and manage authentication seamlessly.

---

### 🚀 Quick Start (with Docker)

⚠️ First build note:
The first `docker compose up --build` may take a few minutes because geospatial libraries
(GDAL/Rasterio) need to be compiled/downloaded.
Subsequent builds will be much faster thanks to Docker layer caching.

---

### 1. Clone the repository

```
git clone https://github.com/Matteobikk90/mind-earth.git
cd mind-earth
```

---

### 2. Start the services

Set env files as shown below (backend/.env, frontend/.env, db/.env).

```
docker compose up --build
```

    -	Frontend → http://localhost:3000
    -	Backend (API) → http://localhost:8000
    -	PostgreSQL → port 5432 (internal, used by backend)

---

### 3. Usage

- Register/login from the frontend.
- Explore geojson layers and population data.
- All services run in isolated Docker containers.

---

⚙️ Environment Variables
Create the following `.env` files in each service folder:

```
- frontend/.env
- backend/.env
- db/.env
```

frontend/.env

```
NEXT_PUBLIC_API_URL=http://backend:8000
```

backend/.env

```
AWS_ACCESS_KEY_ID=access-key-assigned-to-me
AWS_SECRET_ACCESS_KEY=secret-access-key-assigned-to-me
AWS_REGION=eu-central-1
DATABASE_URL=postgresql://postgres:password@db:5432/mindearth
SECRET_KEY=87f70cd9b8aeeb8766b9dc82b6bed4e15eecea7f87ac2e2e8f23ce4467f90d8a
```

> ℹ️ **Note:** This secret key is for testing/demo purposes only.  
> In production, always generate your own with:
> `python -c "import secrets; print(secrets.token_hex(32))"`

db/.env

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=mindearth
```

---

💻 Local Development (without Docker)

If you prefer to run services locally:

### Frontend

```
cd frontend
pnpm install
pnpm dev
```

Runs on → http://localhost:3000

### Backend

```
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Runs on → http://localhost:8000
⚠️ Requires a local PostgreSQL instance.

Create a database named `mindearth`:

```
createdb mindearth
```

Update backend/.env with:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/mindearth
```

---

🔑 Authentication Flow

Login

- User submits email + password.
- Backend verifies credentials and issues a JWT token.
- The token is stored in a HttpOnly cookie, not in localStorage, for improved security.

Logout

- Frontend calls POST /api/auth/logout.
- Backend clears the cookie (access_token="", max_age=0).
- User session ends immediately.

Session Persistence

- Since the token is in a cookie, it persists across page reloads.
- On refresh, the frontend fetches /auth/me to validate the session.
- If the token is valid → returns the user object.
- If expired/invalid → returns 401 Unauthorized.

Example user object:

```
{
"id": 1,
"email": "demo@example.com",
"name": "demo"
}
```

---

🗺️ Map Features

- Interactive Deck.gl map with smooth transitions (FlyToInterpolator)
- Dynamic zoom + bounds calculation based on GeoJSON data
- Handles outliers (e.g., small islands) by filtering/clamping bounds
- Color palettes selectable via sidebar
- Density threshold filter via checkbox
- Click on a region → fetches population age stats (total, <15, 15–64, 65+)

---

💡 Features

- 🔑 JWT-based authentication (register/login/logout)
- 🗂️ Geospatial data serving (GeoJSON)
- 📊 Population statistics endpoint
- 🗺️ Interactive Deck.gl map with filters & stats
- 🌐 CORS-enabled API for frontend integration
- 🐳 Fully Dockerized stack (frontend, backend, db)

---

🐳 Tech Stack

- Frontend: Next.js 15 (App Router, Zustand, Axios, TailwindCSS)
- Backend: FastAPI (SQLModel, Pydantic)
- Database: PostgreSQL (Docker volume persisted)
- Auth: JWT + bcrypt
- DevOps: Docker, Docker Compose

---

🧪 Testing

### Frontend

First, install dependencies in the frontend folder:

```
cd frontend
pnpm install
```

• Unit tests (Vitest + Testing Library):

```
pnpm test:unit
```

• End-to-end tests (Playwright): -

```
pnpm test:e2e
```

### Backend

⚠️ Requires a local PostgreSQL instance.

Create a database named `mindearth`:

```
createdb mindearth
```

Update backend/.env with:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/mindearth
```

Then create a virtual environment and install dependencies:

```
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run tests:

```
pytest
```

---

🛠️ Development
Run services with hot reload:

```
docker compose up --build
```

If you need to reset the DB:

```
docker compose down -v
docker compose up --build
```

---

📦 Project Structure

```
mind-earth/
├── backend/ # FastAPI app
│ ├── app/
│ ├── Dockerfile
│ └── .env
├── frontend/ # Next.js app
│ ├── src/
│ ├── Dockerfile
│ └── .env
├── db/ # Postgres
│ └── .env
├── docker-compose.yaml
└── README.md
```

---

🎁 Extra Feature

For the assignment requirements, please review the `main` branch.

If you’d like to see an experimental **3D extruded map**,
checkout the branch:

```
git checkout feature/extruded-3d
```

⚠️ Note: this feature is responsive and functional, but not fully styled.  
It’s included as a bonus to demonstrate experimentation with 3D visualization.
