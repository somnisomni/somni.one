Data Collector for somni.one
============================

## D1 Database Migration
> Reference: https://www.prisma.io/docs/orm/overview/databases/cloudflare-d1

Execute this sequence in order after every schema change.

### 1. Generate D1 migration
```
$ pnpm wrangler d1 migrations create <DB_NAME> <MIGRATION_NAME>
```

### 2. Do Prisma migration diff
> If you want to check if there are any differences, just run this command without the `--output` flag.
```
$ pnpm prisma:dev migrate diff --from-local-d1 --to-schema ./prisma/schema.prisma --script --output <PATH_TO_D1_MIGRATION_FILE>
```

### 3. Apply the migration
To local:
```
$ pnpm wrangler d1 migrations apply <DB_NAME> --local
```

To remote:
```
$ pnpm wrangler d1 migrations apply <DB_NAME> --remote
```

### 4. Ensure Prisma Client is up to date
```
$ pnpm prisma generate
```
