# NestJS + Postgres API

A NestJS REST API with a notes resource on Postgres, request validation and a health check.

[![Deploy on Naijacloud](https://img.shields.io/badge/Deploy%20on-Naijacloud-008751)](https://naijacloud.com/new?template=nestjs-postgres-api&ref=template-nestjs-postgres-api)

## Deploy

Click **Deploy** above, or open <https://naijacloud.com/new?template=nestjs-postgres-api&ref=template-nestjs-postgres-api>. Naijacloud builds it from this public repo and gives you a live HTTPS address. No GitHub connection needed; you can switch the service to your own fork later.

## What's inside

- NestJS 11 with a `notes` module: list, create, read and delete at `/notes`
- Postgres through `pg` and `DATABASE_URL`; the table is created on first boot
- Request validation with `class-validator`, and `/healthz` that checks the database
- Naijacloud detects Node, runs `npm ci && npm run build`, then `npm start` on `$PORT`

## Environment variables

| Name | What it's for | Default |
| --- | --- | --- |
| `DATABASE_URL` | Postgres connection | Set by Naijacloud when the database is attached |
| `PORT` | Port the server listens on (Naijacloud sets it) | `3000` |

## Run it locally

```sh
git clone https://github.com/naijacloud/template-nestjs-postgres-api
cd template-nestjs-postgres-api
cp .env.example .env   # point DATABASE_URL at a local Postgres
npm install
npm run dev
```

## License

MIT
