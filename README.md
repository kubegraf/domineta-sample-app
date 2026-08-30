# Orkastor Sample App

A minimal Node.js HTTP server to test Orkastor Cloud's autonomous build and deploy pipeline.

## What this tests

1. **No Dockerfile** — Orkastor detects Node.js from `package.json` and generates a Dockerfile
2. **Automatic build** — The image is built on Orkastor's own build pool
3. **Registry storage** — The image is pushed to `registry.orkastor.cloud`
4. **Deploy** — The app is deployed with an HTTPS URL
5. **Auto-redeploy** — Push to `main` triggers a rebuild and redeploy

## Endpoints

- `GET /` — Landing page
- `GET /health` — Health check (JSON)
- `GET /api/info` — App info (JSON)

## How it works on Orkastor

1. Connect this repo in the Orkastor Console
2. Orkastor scans the repo and detects Node.js (from `package.json`)
3. Since there's no Dockerfile, Orkastor generates one:
   ```dockerfile
   FROM node:20-slim
   WORKDIR /app
   COPY package.json ./
   RUN npm install --production
   COPY . .
   EXPOSE 8080
   CMD ["node", "server.js"]
   ```
4. The image is built and pushed to `registry.orkastor.cloud`
5. The app is deployed and gets an HTTPS URL
6. Future pushes to `main` trigger automatic rebuild + redeploy
