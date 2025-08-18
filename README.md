# 🌍 Mind Earth

A full-stack geospatial platform built with **Next.js**, **FastAPI**, **PostgreSQL**, and **Docker**.  
Mind Earth lets you explore geo-data, population stats, and manage authentication seamlessly.

---

### 🚀 Quick Start (with Docker)

---

### 1. Clone the repository

```bash
git clone https://github.com/Matteobikk90/mind-earth.git
cd mind-earth

```

---

### 2. Start the services

Set env files as shown below (backend/.env, frontend/.env, db/.env).

```bash
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

💡 Features

- 🔑 JWT-based authentication (register/login/logout)
- 🗂️ Geospatial data serving (GeoJSON)
- 📊 Population statistics endpoint
- 🌐 CORS-enabled API for frontend integration
- 🐳 Fully Dockerized stack (frontend, backend, db)

---

🐳 Tech Stack

- Frontend: Next.js 15 (App Router, Zustand, Axios, TailwindCSS)
- Backend: FastAPI (SQLModel, Pydantic)
- Database: PostgreSQL (Docker volume persisted)
- Auth: JWT + bcrypter
- DevOps: Docker, Docker Compose

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
