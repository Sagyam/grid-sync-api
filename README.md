## Description

Grid Sync API is a NestJS application that provides a REST API for the Grid Sync application. It is a simple application that provides CRUD operations for a single entity, the `Grid`. The `Grid` entity is a simple object that contains a `name` and a `data` property. The `data` property is a stringified JSON object that contains the grid data. The `Grid` entity is stored in a MongoDB database.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
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

