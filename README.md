# Alstone Hauly AI — Starter Website

A mobile-friendly starter website with a futuristic dark/cyan design, illustrated robot tutor, Python lesson previews, and a demo chat endpoint.

## What works now
- Responsive home page and navigation
- CSS-illustrated robot (no external image required)
- Python, Web Development, and AI lesson previews
- Chat UI connected to a **demo** Express endpoint
- Health check at `/api/health`

## Important limitations
This is a starter, not a complete production AI platform:
- Chat replies are placeholders; no real AI provider is connected.
- No student accounts, database, payments, course progress saving, voice tutor, or interactive Python execution yet.
- Do not enter private information into the demo chat.
- Never put AI API keys in `public/app.js` or other browser-side files.

## Run the backend locally
Requires Node.js on a computer or a supported Node hosting service.

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

## Deploying the static website on Netlify
The `public` folder contains the frontend. If you deploy only `public` to Netlify, the page design and lesson previews work, but `/api/chat` will not work because the Express backend is not running there.

For a complete setup:
1. Put this project in a GitHub repository.
2. Deploy the project root to a Node.js host such as Render using `npm install` as the build command and `npm start` as the start command.
3. Deploy the `public` folder to Netlify, or configure a frontend build/deploy.
4. Update `public/app.js` to call your deployed backend URL if the frontend and backend are on separate hosts. Configure allowed origins and security before production.

## Suggested next steps
1. Publish the frontend.
2. Deploy the backend.
3. Connect a real AI provider securely.
4. Add accounts and a database.
5. Add voice interaction and a 3D humanoid model.
6. Add sandboxed coding exercises and progress tracking.
