## Description

Grid Sync API is a NestJS application that provides a REST API for the Grid Sync application.

## Demo URLs

- [Frontend](https://grid-sync.vercel.app/)

- [Developer Documentation](https://sagyam.github.io/grid-sync-api/)

- [Swagger Docs](https://beige-dog-toga.cyclic.app/swagger-docs/)

- [API Endpoint](https://beige-dog-toga.cyclic.app/)

## Features

- CRUD Endpoint for batteries
- Database seeder scripts
- Pagination, filtering and sorting on every on all properties
- Dockerized application
- Automated deployment upon merge to master
- Automated docs generation
- Swagger UI for API documentation
- Automated testing upon merge to master
- Automated code formatting linting on push
- Automated docker image building and publishing
- Convenient commit messages using commitizen.

## Tech Stack

- NestJS
- TypeScript
- MongoDB
- Docker
- Prisma
- GitHub Actions
- GitHub Pages

## Installation

```bash
$ pnpm install
```

## Development

```bash
$ pnpm run start:dev
```

## Deployment

```bash
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test
# e2e tests
$ pnpm run test:e2e
# test coverage
$ pnpm run test:cov
```

