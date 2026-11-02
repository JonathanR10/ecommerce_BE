# Ecommerce API

Backend REST API for an ecommerce application, built with NestJS, TypeScript, PostgreSQL, TypeORM, and JWT authentication.

## Features

- User registration and sign-in with bcrypt password hashing.
- JWT-protected routes and role-based access on selected routes.
- Product and category browsing, including pagination for products.
- Order creation and lookup.
- Product image uploads through Cloudinary.
- Interactive API documentation with Swagger.

## Requirements

- Node.js 22 or later
- npm
- PostgreSQL (or Docker and Docker Compose)
- Cloudinary credentials for image uploads

## Configuration

The application loads its environment from `.env.development` in the project root. Copy `.env.example` to `.env.development`, then fill in the values:

```env
PORT=3000
HOST=localhost

DB_NAME=ecommerce
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=replace-with-your-database-password

CLOUDINARY_CLOUD_NAME=replace-with-your-cloud-name
CLOUDINARY_API_KEY=replace-with-your-api-key
CLOUDINARY_API_SECRET=replace-with-your-api-secret

JWT_SECRET=replace-with-a-long-random-secret

POSTGRES_DB=ecommerce
POSTGRES_PASSWORD=replace-with-your-database-password
```

For a local API connecting to a local PostgreSQL instance, use `DB_HOST=localhost`. When running the API with the included Docker Compose file, use `DB_HOST=postgresdb`.

Keep `.env.development` private; do not commit real credentials.

> **Database warning:** TypeORM is currently configured with `dropSchema: true` and `synchronize: true`. Starting the application drops and recreates the database schema, which can destroy existing data. Do not run it against a database whose data you need to keep.

## Install and run

```bash
npm install

# Development
npm run start:dev

# Build
npm run build

# Run the compiled application
npm run start:prod
```

The API listens on port `3000` by default. Change `PORT` in `.env.development` to use another port.

### Docker Compose

After creating `.env.development` as described above:

```bash
docker compose up --build
```

This starts the API and PostgreSQL services. The same database warning applies: the current TypeORM configuration drops the schema during application startup.

## API documentation

When the server is running, open Swagger UI at:

```text
http://localhost:3000/api
```

Use the **Authorize** button in Swagger to provide a JWT for protected endpoints.

## API overview

All routes are relative to the server base URL, for example `http://localhost:3000`.

| Method | Route | Description | Access |
|---|---|---|---|
| `GET` | `/` | Health/welcome response | Public |
| `POST` | `/auth/signup` | Register a user | Public |
| `POST` | `/auth/signin` | Sign in and receive a JWT | Public |
| `GET` | `/categories` | List categories | Public |
| `GET` | `/products?page=1&limit=5` | List products (default page 1, limit 5) | Public |
| `GET` | `/products/:id` | Get a product by UUID | Public |
| `PUT` | `/products/:id` | Update a product | Admin |
| `DELETE` | `/products/:id` | Delete a product | Public |
| `GET` | `/users?page=1&limit=5` | List users (default page 1, limit 5) | Admin |
| `GET` | `/users/:id` | Get a user by UUID | JWT required |
| `PUT` | `/users/:id` | Update a user | JWT required |
| `DELETE` | `/users/:id` | Delete a user | JWT required |
| `POST` | `/orders` | Create an order | JWT required |
| `GET` | `/orders/:id` | Get an order | JWT required |
| `PUT` | `/files/uploadImage/:id` | Upload a product image (`multipart/form-data`, field `file`) | JWT required |

Protected routes expect the header:

```text
Authorization: Bearer <token>
```

The sign-in request body contains an email and password:

```json
{
  "email": "customer@example.com",
  "password": "your-password"
}
```

The sign-in response includes the JWT. Tokens expire after 60 minutes. Since this API uses stateless JWTs and does not provide a logout endpoint, clients should discard the token when the user signs out.

An order request accepts a user UUID and one or more product UUIDs:

```json
{
  "userId": "00000000-0000-4000-8000-000000000001",
  "products": ["00000000-0000-4000-8000-000000000002"]
}
```

## Seed data

Categories, products, and demo users are seeded when the application starts. The project also exposes `GET /categories/seeder` and `GET /products/seeder` routes for categories and products.

## Tests

```bash
npm test
npm run test:e2e
npm run test:cov
```

## Tech stack

- [NestJS](https://nestjs.com/)
- TypeScript
- PostgreSQL and TypeORM
- JWT (`@nestjs/jwt`) and bcrypt
- Cloudinary
- Swagger / OpenAPI
