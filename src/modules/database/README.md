# Kudos Database Module (@kudos/database)

### Development

Force push the current schema to the database

```bash
bun db:push:dev
```

### Production

Run a database migration

```bash
docker compose -p kudos run --rm  db-migrate
```
