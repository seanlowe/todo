#! /usr/local/bin/node

const { todoSeeder } = require( './seeders/todoSeeder' )

const seeders = [
  todoSeeder
]

seeders.forEach( async ( seeder ) => {
  await seeder()
})
