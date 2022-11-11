#! /usr/local/bin/node

const { db } = require( '../../util/scripts/js/check-db-connection' )

const users = [
  {
    // password: johndoe
    username: 'johndoe',
    password: '$2b$10$hMWV.bVMfMUKEFrMOwdVUuPc/2wM.pAT7ixTqS5kJGjxd6R8dxU2W',
  },
  {
    // password: janedoe
    username: 'janedoe',
    password: '$2b$10$hMWV.bVMfMUKEFrMOwdVUuf4I55iVmHXl1t77Dg4j/JDnC71JQCqu',
  },
]

const userSeeder = async () => {
  return db.user.createMany({
    data: users,
  })
}

module.exports.userSeeder = userSeeder
