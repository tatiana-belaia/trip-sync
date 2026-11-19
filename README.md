# TripSync

TripSync is a full-stack travel planning application built with Next.js, TypeScript, Fastify, and PostgreSQL.

The project is developed incrementally, focusing on end-to-end functionality, maintainable architecture, and automated testing.

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

### Trips List

- Fetch trips from PostgreSQL through the Fastify `GET /trips` endpoint.
- Display trip titles using Next.js Server Components.
- Show a loading state while fetching data.
- Display an empty state when no trips exist.
- Handle API errors with a retry option.
- Use typed API responses.

**Current limitation:** Trip-detail pages are not yet integrated with the PostgreSQL API.

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL
- TripSync backend repository

### 1. Start the Backend

Configure the PostgreSQL database connection in the backend project.

```bash
npm install
npm run dev
```

The Fastify API runs at `http://localhost:3001`.

### 2. Start the Frontend

Create a `.env.local` file in the frontend project root:

```env
TRIPS_API_BASE_URL=http://localhost:3001
```

Install dependencies and start Next.js:

```bash
npm install
npm run dev
```

Open `http://localhost:3000/trips`.

The backend and PostgreSQL must be running to retrieve trips.

## Testing

Run frontend tests:

```bash
npm run test -- --run
```

Run TypeScript checks and ESLint:

```bash
npx tsc --noEmit
npm run lint
```

Verify the production build:

```bash
npm run build
```

The Trips page includes an automated component test that verifies trip titles are rendered using mocked data.

The loading, empty, error, retry, and database integration scenarios have also been tested manually.

## Project Status

The trips list API integration is implemented and tested. Trip-detail integration and additional travel-planning functionality remain future work.