import { createReadStream, existsSync, readFileSync } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "public");
const envPath = path.resolve(__dirname, "..", ".env");

if (existsSync(envPath)) {
  const envLines = readFileSync(envPath, "utf-8").split(/\r?\n/);
  for (const line of envLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separator = trimmed.indexOf("=");
    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

const port = Number.parseInt(process.env.PORT || "4173", 10);
const host = process.env.HOST || "127.0.0.1";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

function safePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const target = cleanPath === "/" ? "/index.html" : cleanPath;
  const resolved = path.resolve(root, `.${target}`);
  return resolved.startsWith(root) ? resolved : null;
}

const server = http.createServer(async (req, res) => {
  const target = safePath(req.url || "/");
  if (!target) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  const fallback = path.join(root, "index.html");
  const filePath = existsSync(target) ? target : fallback;

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(500);
    res.end("Server error");
  }
});

server.listen(port, host, () => {
  console.log(`AgriTalk demo is running at http://${host}:${port}`);
});
