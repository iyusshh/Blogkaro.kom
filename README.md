# ColorBurst OAuth Blog (Full‑Stack)

A stylish full‑stack blog built with **Next.js 14 (App Router)** + **Prisma (SQLite)** + **Tailwind**,
featuring a **hand‑rolled Google OAuth 2.0 flow** (no Firebase/Supabase/next-auth).

## Features
- Manual Google OAuth 2.0: login -> code exchange -> tokens -> userinfo -> session JWT cookie
- Session‑gated actions: only logged‑in users can create posts, like, comment
- CRUD for posts (create, read, update, delete)
- Likes & comments with counts
- User Dashboard: lists your posts, likes and comments
- Clean animated glassmorphism UI with Tailwind

## Quick Start
```bash
# 1) Install deps
pnpm i  # or npm i or yarn

# 2) Copy env and fill values
cp .env.example .env

# 3) Push DB schema
pnpm db:push

# 4) Run
pnpm dev
```
Then open http://localhost:3000 and click **Login with Google**.

### Google OAuth Setup
- Authorized redirect URI must be: `http://localhost:3000/api/auth/callback`
- Fill `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` and a strong `JWT_SECRET` in `.env`.

## Project Structure
```
src/app
  api/auth/login            # Redirects to Google
  api/auth/callback         # Exchanges code -> tokens, sets session
  api/auth/logout           # Clears session
  api/posts                 # GET/POST
  api/posts/[id]            # GET/PATCH/DELETE
  api/posts/[id]/like       # POST toggle like
  api/posts/[id]/comments   # GET/POST
  (pages) /, /post/[id], /dashboard
src/components              # Feed, NewPost, LikeButton, Comments, CommentBox
src/lib                     # db (Prisma), session (JWT cookie), google (helpers)
prisma/schema.prisma        # SQLite models: User, Post, Like, Comment
```

## Notes
- Sessions are **signed JWTs** stored in an HTTP‑only cookie `cb_session` (7‑day expiry).
- DB is SQLite for easiest local setup. Swap to Postgres/MySQL by editing `datasource` in `prisma/schema.prisma`.
- UI is intentionally minimal yet vivid—tweak `globals.css` for your vibe.
