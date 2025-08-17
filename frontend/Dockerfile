FROM node:18-bullseye-slim
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json frontend/
RUN npm install -g pnpm && pnpm install --filter frontend...
COPY frontend ./frontend
WORKDIR /app/frontend
EXPOSE 3000
CMD ["pnpm", "dev"]
