#! /usr/local/bin/node

const { db } = require( '../../util/scripts/js/check-db-connection' )

const users = [
  {
    // password: johndoe
    username: 'johndoe',
    password: '$2y$10$L6oqxzCoL03.XDIcuF.pQOYXUMaTOyXQnRDfOaTrhJZb.cYdHBR6S',
  },
  {
    // password: janedoe
    username: 'janedoe',
    password: '$2y$10$5ij5EjfIm./tSfDdZ2IP0OFeT0FPc8zJJMJMTQDo4RMjul/T2EAO6',
  },
]

const userSeeder = async () => {
  return db.user.createMany({
    data: users,
  })
}

module.exports.userSeeder = userSeeder
