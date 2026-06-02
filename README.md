# AgriTalk Demo

Static immersive demo for the `AgriTalk-RL` project.

## Local Run

```bash
./start.sh
```

Open `http://127.0.0.1:4173`.

Optional local config:

```bash
cp .env.example .env
```

## LAN Sharing

Set `HOST=0.0.0.0` in `.env`, restart, then open from another device with your computer's local IP, for example:

```bash
http://192.168.1.23:4173
```

## Deploy

This project is deployment-ready as a static site.

### Vercel

`vercel.json` is already included. You can deploy the repo or folder directly.

### Temporary public sharing

Use a tunnel such as Cloudflare Tunnel or ngrok and point it at port `4173`.
