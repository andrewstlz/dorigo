# DoriGo

Performance scheduling and signup tool for choral groups.  
Frontend: Next.js (App Router) with Tailwind and FullCalendar.  
Backend: Express + Prisma + Passport (session-based auth) with officer-only event creation and voice-part quotas.

## Project Structure

- **frontend/** — Next.js 14 application
  - Calendar (`/calendar`)
  - Event detail + signup (`/events/[id]`)
  - Login (`/login`)
  - Dashboard redirect
  - “My Signups” (`/my-signups`)
  - Axios client configured to point to the backend API
- **backend/** — Express API using Passport Local Strategy, session authentication, and Prisma ORM for PostgreSQL
- **backend/prisma/schema.prisma** — Models for:
  - `User`
  - `Event`
  - `Quota`
  - `Signup`

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Two terminals (or a process manager) to run frontend and backend in parallel
- Backend `.env` file (see below)

## Backend Environment Variables (`backend/.env`)

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME
SESSION_SECRET=your-session-secret
OFFICER_SECRET=shared-secret-for-officer-registration
```

Frontend API base URL is configured in:

```
frontend/lib/api.ts
```

Default:  
`http://localhost:4000`  
Change if your backend host or port differs.

## Backend Setup

```bash
cd backend
npm install
npx prisma migrate deploy   # or `npx prisma db push` for development
npm run dev                 # serves http://localhost:4000
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev                 # serves http://localhost:3000
```

The root route redirects:

- to `/login` when unauthenticated
- to `/dashboard` when logged in

## Key Features

- Email/password authentication with sessions
  - `/auth/login`, `/auth/me`, `/auth/logout`
- Officer registration via secret (`/auth/register-officer`)
- Member self-registration (`/auth/register`)
- Event creation (officers only)
- Voice-part quotas per event
- Signup tracking with automatic quota increments
- Calendar view (FullCalendar)
- Event detail page with signup form
- Personal signup list (“My Signups”)

## Running Both Services

Start the backend first, then the frontend:

- **API:** `http://localhost:4000`
- **Web:** `http://localhost:3000`

## Useful Scripts

### Backend

- `npm run dev`
- `npm run build`
- `npm start`

### Frontend

- `npm run dev`
- `npm run build`
- `npm start`
- `npm run lint`
