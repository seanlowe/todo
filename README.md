# Todo Web App

Minimum Requirements:
- [x] View a list of to-do items 
- [x] Ability to filter the list by pending, complete, and all to-dos
- [x] Create a new to-do item
- [x] Edit a to-do item
- [x] Delete a to-do item
- [x] Complete a to-do item

Uses: Vercel, Planetscale, Next.js, mySQL, Prisma, Material UI, eslint

Sidenote: referenced this comment for errors regarding openssl with Prisma: https://github.com/prisma/prisma/issues/15505#issuecomment-1295905221

## .env setup

First, rename the .env.example to just .env

```bash
cp .env.example .env.local
```

Values for the `DATABASE_URL` can be plugged in with the values used in and/or returned from the following commands:

```bash
pscale database create <DATABASE_NAME>
```
**Note:** <BRANCH_NAME> will be `main` (this is automatically created when the DB is created on Planetscale)
 
```bash
pscale password create <DATABASE_NAME> <BRANCH_NAME> <PASSWORD_NAME>
```
and it's output looks like this:

```
Password production-password was successfully created.
Please save the values below as they will not be shown again

NAME                 USERNAME       ACCESS HOST URL              ROLE              PLAIN TEXT
-------------------- -------------- ---------------------------- ----------------- ------------------
production-password  xxxxxxxxxxxxx  xxxxxx.us-east-2.psdb.cloud  Can Read & Write  pscale_pw_xxxxxxx
```

Then you will have all the values to fill in your DATABASE_URL.

Snippet above pulled from Vercel's Next.js [example](https://github.com/vercel/next.js/tree/canary/examples/with-mysql) for using MySql.
