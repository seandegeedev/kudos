# Kudos Database Module (@kudos/database)

### Development

Generate prisma client

> Client must be generated to be able to be used by other services and modules.

```bash
bun db:generate
```

Force push the current schema to the database

```bash
bun db:push:dev
```

### Production

Run a database migration

```bash
docker compose -p kudos run --rm  db-migrate
```
