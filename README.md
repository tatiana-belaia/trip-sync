# TripSync

TripSync is a full-stack travel planning application built with Next.js, TypeScript, Fastify, and PostgreSQL.

The project focuses on end-to-end functionality, maintainable architecture, and automated testing.

## Tech Stack

**Frontend**

- Next.js 16 (App Router)
- React and TypeScript
- Tailwind CSS
- Vitest and React Testing Library

**Backend**

- Node.js and Fastify
- TypeScript
- PostgreSQL

The frontend and backend are maintained in separate repositories.

## Implemented Features

- Retrieve trips from PostgreSQL using `GET /trips`.
- Display trip titles in Next.js Server Components.
- Navigate to individual trips using database-generated UUIDs.
- Fetch trip details using `GET /trips/:id`.
- Handle loading, empty, and error states.
- Display a not-found page for nonexistent trips.
- Automated tests for frontend components and backend API endpoints.

### Itinerary Suggestions Preview

TripSync includes a read-only itinerary suggestions preview backed by the Fastify API.

The preview:

- Fetches validated sample suggestions from `POST /ai/itinerary-suggestions`.
- Displays activities grouped by day and ordered by position.
- Handles API failures with an error message and retry option.
- Includes component tests for different suggestions, activity ordering, and error handling.

**Run locally:** Start the backend and frontend, then open `http://localhost:3000/ai-preview`.

**Note:** Suggestions currently use predefined fixtures, not a live AI model. They are not saved to PostgreSQL.

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL installed and running
- Both TripSync repositories

### 1. Set Up PostgreSQL

From the backend repository, create the database:

```bash
createdb tripsync
```

If the database already exists, skip this command.

Initialize the schema using the provided SQL scripts:

```bash
psql -d tripsync -f sql/001_create_trips.sql
psql -d tripsync -f sql/002_create_itinerary_items.sql
```

The first script creates the `trips` table and inserts a sample trip. The second creates the `itinerary_items` table.

The scripts are intended for a fresh database and are not repeatable migrations.

### 2. Start the Backend

From the backend repository:

```bash
npm install
npm run dev
```

The Fastify API runs at `http://localhost:3001`.

The backend connects to the `tripsync` PostgreSQL database using the `pg` connection pool.

It uses PostgreSQL's default connection settings and supports standard environment variables such as `PGHOST`, `PGPORT`, `PGUSER`, and `PGPASSWORD` when required by your local installation.

Verify the API:

```bash
curl http://localhost:3001/trips
```

The response should contain a JSON array with the trips stored in PostgreSQL.

### 3. Start the Frontend

From the frontend repository, create `.env.local`:

```env
TRIPS_API_BASE_URL=http://localhost:3001
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open:

`http://localhost:3000/trips`

Both PostgreSQL and Fastify must be running for the application to fetch trips.

## Testing

### Backend

Run API tests:

```bash
npm test
```

Tests use Fastify request injection and database mocks, so they don't require a running PostgreSQL instance.

### Frontend

Run all tests:

```bash
npm run test -- --run
```

Check TypeScript:

```bash
npx tsc --noEmit
```

Run ESLint:

```bash
npm run lint
```

Verify the production build:

```bash
npm run build
```

## Project Status

The trip list and trip-detail pages are integrated with the Fastify API and PostgreSQL.

Additional travel-planning functionality and full itinerary persistence integration remain future work.
