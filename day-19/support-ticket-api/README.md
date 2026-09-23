# SUPPORT TICKET SYSTEM

## ARCHITECTURE

```
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Prisma
  ↓
PostgreSQL
```

## TECH STACK

- Nodejs 22+
- Typescript with strict mode
- Express
- Prisma ORM
- PostgrSql
- Zod
- JWT authentication
- bcrypt password hashing
- vitest
- supertest
- ESLint

## Prerequisites
- Node.js 22+
- npm

## Set up
```
git clone <repo name>
git checkout day-19

cd day-19/support-ticket-api

npm install

cp .env.example .env

npm run db:migrate
npm run db:generate

npm run dev

```
#### note
```
Application run at http://localhost:3000

```

#### .env example values:
```

DATABASE_URL="postgresql://akshay:psql@localhost:5432/prisma9_sts_authentication?schema=public"
JWT_SECRET="jwt_secret_dev"
JWT_EXPIRES_IN="1h"
LOG_LEVEL='debug'
```

## API endpoints

### HEALTH

- `GET /health`

### Authentication

-  `POST /api/user/signup`
-  `POST /api/user/login`
-  `GET  /api/user/current-user`

### Usage example

Login to receive a JWT and use it as a Bearer token for protected endpoints.

- Login and extract token

```
curl -s -X POST http://localhost:3000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
        "email":"customer1@example.com",
        "password":"123456",
        "role":"USER"
    }' \
  | jq -r '.data.token'
```

- call a protected endpoint with token

```TOKEN = paste the token here
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/user/current-user
```

The server expects the Authorization header in the form `Bearer <token>` for routes protected by authentication middleware.

### Ticket

- `POST /api/ticket/create`
- `GET /api/ticket/:id`
- `PUT /api/ticket/:id/:status`
- `DELETE /api/ticket/:id`

## AUTHORIZATION MODEL

### ADMIN
- can view all tickets
- can assign ticket
- can delete tickets
- can change ticket status

### AGENT
- can view assigned tickets
- can update ticket status

### CUSTOMER
- can create ticket
- can update tickets in with status "OPEN"
- can update and delete tickets they created

## TEST

```
npm run test
```