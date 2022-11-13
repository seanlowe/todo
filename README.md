# Todo Web App

Minimum Requirements:
- [x] View a list of to-do items 
- [x] Ability to filter the list by pending, complete, and all to-dos
- [x] Create a new to-do item
- [x] Edit a to-do item
- [x] Delete a to-do item
- [x] Complete a to-do item

Additional Capabilities:
- [x] Persistent Filtering
- [x] Error handling for all requests
- [x] User notification when prudent
- [x] Basic Authentication
  - login,
  - logout,
  - registration,
  - password encryption using bcrypt, and
  - validation messages for:
    - creating accounts with a username already taken
    - incorrect login values

Things which could make this project better:
- automated testing (using something like jest)
- account management
  - 'Forgot Password' functionality
  - 2FA (would require additional information stored on account creation, i.e. user email)
  - account deletion w/ cascade delete of all associated Todo entries
- additional login/logout functionality
  - local storage cookie for maintaining login status (for a time)
  - timeout on local storage cookie for auto-logout
  - signout deletes cookie from local storage for safety
- additional table functionality
  - better 'no records found' watermark
  - some visual indicator when retrieving records from DB

Uses: Vercel, Planetscale, Next.js, mySQL, Prisma, Material UI, eslint

Sidenote: referenced this comment for errors regarding openssl with Prisma: https://github.com/prisma/prisma/issues/15505#issuecomment-1295905221


## .env setup

First, rename the .env.example to just .env

```bash
cp .env.example .env
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

### Caveats

Had to deal with having no relation / FK constraint between my Users and my Todos as Planetscale does not allow for FK and Prisma has no way of managing relations without a FK. In the end, I just decided that the userId will be manually added to each todo created and will only be an INT value that can be used to filter against.