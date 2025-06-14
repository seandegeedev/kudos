# Start with a base image that has Node.js installed
FROM node:22.16.0

# Install dependencies for Bun
RUN apt-get update && \
    apt-get install -y curl unzip && \
    rm -rf /var/lib/apt/lists/*

# Download and install the latest version of Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to the PATH
ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

WORKDIR /usr/local/src/kudos

# Copy the root package.json and lockfile file to the container
COPY ../../package.json ./
COPY ../../bun.lock ./

# Copy the kudos app package.json file to the container
COPY package.json ./modules/database/

# Copy the rest of the application code
COPY . .

RUN bun add -g prisma

WORKDIR /usr/local/src/kudos/modules/database

# 👇 When implimented, should should switch to migration script (db:migrate:deploy)
ENTRYPOINT [ "bun", "db:push:dev" ]