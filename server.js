const http = require("http");

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const now = new Date().toISOString();

  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", timestamp: now }));
    return;
  }

  if (req.url === "/api/info") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      app: "domineta-sample-app",
      version: "1.0.0",
      runtime: `Node.js ${process.version}`,
      deployed_on: "Domineta",
      env: process.env.NODE_ENV || "production",
      timestamp: now,
    }));
    return;
  }

  // Default: landing page
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Domineta Sample App</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0B0B0C; color: rgba(250,248,244,0.92);
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
    }
    .container { max-width: 600px; padding: 48px 32px; text-align: center; }
    h1 { font-size: 28px; font-weight: 700; margin-bottom: 12px; }
    .accent { color: #FF7A1F; }
    p { font-size: 14px; color: rgba(250,248,244,0.58); line-height: 1.7; margin-bottom: 24px; }
    .info { background: rgba(250,248,244,0.04); border: 1px solid rgba(250,248,244,0.10);
      border-radius: 12px; padding: 20px; text-align: left; font-family: 'JetBrains Mono', monospace;
      font-size: 12px; color: rgba(250,248,244,0.50); line-height: 1.8; }
    .info strong { color: rgba(250,248,244,0.92); }
    a { color: #FF7A1F; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Running on <span class="accent">Domineta</span></h1>
    <p>
      This app was built and deployed automatically.<br>
      No Dockerfile was provided — Domineta detected Node.js and generated one.
    </p>
    <div class="info">
      <strong>Runtime:</strong> Node.js ${process.version}<br>
      <strong>Port:</strong> ${PORT}<br>
      <strong>Time:</strong> ${now}<br>
      <strong>Endpoints:</strong><br>
      &nbsp;&nbsp;<a href="/health">/health</a> — health check<br>
      &nbsp;&nbsp;<a href="/api/info">/api/info</a> — app info (JSON)
    </div>
  </div>
</body>
</html>`);
});

server.listen(PORT, () => {
  console.log(\`🚀 domineta-sample-app listening on port \${PORT}\`);
});
