![kudos_banner](https://github.com/user-attachments/assets/2b165fd2-1e58-416b-9d80-c8a1b253a281)


Made with ❤️ by [Sean De Gee](https://github.com/SeanDeGeeDev) for [Sintrex Integration Services](https://www.sintrex.com/)

# Kudos

## Current Versions

- OS: Ubuntu 24.04.1 LT
- Git: 2.43.0
- Node: 22.13.1
- Bun: 1.2.2
- Docker: 27.5.1

## Getting Started - Production

### Prerequisites

On you production machine, the following prerequisites will need to be installed

- Git: 2.43.0
- Docker: 27.5.1

### Production Server Setup

You can run the provided bash script `server_setup_prod.sh` on a fresh installation of Ubuntu 24.04.1 to setup the production server environment or run the commands therein manually if desired.

### Clone this repository

Within your user of choice's `/home` directory, clone this repository. ⚠️ Be sure to replace `[username]` and `[development_token]` with your GitHub username and development token:
```bash
git clone https://[username]:[development_token]@github.com/seandegeedev/kudos.git
```

### Create a `.env` file

Within the `src` folder, using the provided `template.env` create a `.env` file and define/change any needed environment variables within.

> ⚠️ Note: All variables within the `.env` file are required. Most variables are defined for you, but there are a few that are left blank or have used placeholders (marked with and 👈) and will need to be defined

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
- Upon first starting the `db` docker container, a `kudos` directory will be created in the `data/db` folder that the container will mount to and will contain the postgresql database data for kudos.
- Upon first starting the `pgadmin` docker container, files will be created in the `data/pgadmin` folder that the container will mount to and will contain the pgAdmin data for kudos.

## Getting Started - Development

### Prerequisites

On you development machine, the following prerequisites will need to be installed

- Git: 2.43.0
- Node: 22.13.1
- Bun: 1.2.2
- Docker: 27.5.1

### Development Server Setup

You can run the provided bash script `server_setup_dev.sh` on a fresh installation of Ubuntu 24.04.1 to setup the development server environment or run the commands therein manually if desired.

### Clone this repository

Within your user of choice's `/home` directory, clone this repository. ⚠️ Be sure to replace `[username]` and `[development_token]` with your GitHub username and development token:
```bash
git clone https://[username]:[development_token]@github.com/seandegeedev/kudos.git
```

### Git Credentials Setup

Before you are able to make any commits, your git credentials need to be set up

Withing the root directory of the repo:

1. Set up username and email
```bash
git config --global user.name "[username]"
git config user.name "[username]"

git config --global user.email "[email]"
git config user.email "[email]"
```

2. Save credentials

```bash
git config --global credential.helper store
git pull
```

### Create the `.env` files

- Within the `src` folder, using the provided `template.env` create a `.env` file in the same directory and define/change any needed environment variables within.
- Copy the created .env file into the following direcotries (this only needs to be done in development environments):
  - `src/apps/kudos`

> ⚠️ Note: All variables within the `.env` files are required. Most variables are defined for you, but there are a few that are left blank or have used placeholders (marked with and 👈) and will need to be defined

### Install dependencies

Within the `src` folder of the repository, install all packages by running

```bash
bun install
```

### Start the database containers
```bash
docker-compose -p kudos --profile db-only up -d
```

### Stop the database containers

```bash
docker compose -p kudos down
```

### Push database schema
In `app/modules/database`, run:

```bash
bun db:push:dev
```

### Side Effects
- Upon first starting the `db` docker container, a `kudos` directory will be created in the `data/db` folder that the container will mount to and will contain the postgresql database data for kudos.
- Upon first starting the `pgadmin` docker container, files will be created in the `data/pgadmin` folder that the container will mount to and will contain the pgAdmin data for kudos
