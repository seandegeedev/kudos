![kudos_banner](https://github.com/user-attachments/assets/2b165fd2-1e58-416b-9d80-c8a1b253a281)


Made with ❤️ by [Sean De Gee](https://github.com/SeanDeGeeDev) for [Sintrex Integration Services](https://www.sintrex.com/)

# Kudos

## Current Versions

- OS: Ubuntu 24.04.1 LT
- Node: 22.13.1
- Bun: 1.2.2
- Docker: 27.5.1

## Getting Started - Production

### Prerequisites

On you production machine, the following prerequisites should be installed

- Docker: 27.5.1

Within the `src` folder:

### Create a `.env` file

Using the provided `template.env` create a `.env` file and define/change any needed environment variables within.

### Start Kudos

```bash
docker compose -p kudos --profile prod up -d --build
```

### Run database migrations

```bash
docker compose -p kudos run --rm  db-migrate
```

### Stop Kudos

```bash
docker compose -p kudos down
```

### Side Effects
- Upon first starting the `db` docker container, a `kudos` directory will be created in the `data` folder that the container will mount to and will contain the postgresql database data for kudos.

## Getting Started - Development

### Prerequisites

On you development machine, the following prerequisites should be installed

- Node: 22.13.1
- Bun: 1.2.2
- Docker: 27.5.1

### Create a `.env` file

Within the `src` folder, using the provided `template.env` create a `.env` file and define/change any needed environment variables within.

### Install dependencies

Within the `src` folder of the repository, install all packages by running

```bash
bun install
```

### Start database
```bash
docker-compose -p kudos --profile db-only up -d
```

> The Adminer interface will be availabe on localhost port 8090

### Push database schema
In `app/modules/database`, run:

```bash
bun db:push:dev
```
