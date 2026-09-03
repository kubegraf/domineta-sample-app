# Domineta Sample App

A minimal Node.js HTTP server to test Domineta's autonomous build and deploy pipeline.

## What this tests

1. **No Dockerfile** — Domineta detects Node.js from `package.json` and generates a Dockerfile
2. **Automatic build** — The image is built on Domineta's own build pool
3. **Registry storage** — The image is pushed to `registry.domineta.com`
4. **Deploy** — The app is deployed with an HTTPS URL
5. **Auto-redeploy** — Push to `main` triggers a rebuild and redeploy

## Endpoints

- `GET /` — Landing page
- `GET /health` — Health check (JSON)
- `GET /api/info` — App info (JSON)

## How it works on Domineta

1. Connect this repo in the Domineta Console
2. Domineta scans the repo and detects Node.js (from `package.json`)
3. Since there's no Dockerfile, Domineta generates one:
   ```dockerfile
   FROM node:20-slim
   WORKDIR /app
   COPY package.json ./
   RUN npm install --production
   COPY . .
   EXPOSE 8080
   CMD ["node", "server.js"]
   ```
4. The image is built and pushed to `registry.domineta.com`
5. The app is deployed and gets an HTTPS URL
6. Future pushes to `main` trigger automatic rebuild + redeploy
