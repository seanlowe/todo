#! /usr/local/bin/node

const { userSeeder } = require( './seeders/userSeeder' )
const { todoSeeder } = require( './seeders/todoSeeder' )

const seeders = [
  userSeeder,
  todoSeeder
]

seeders.forEach( async ( seeder ) => {
  await seeder()
})
