#! /usr/local/bin/node

const { db } = require( '../../util/scripts/js/check-db-connection' )

const todos = [
  {
    description: 'learn golang',
    userId: 2,
  },
  {
    description: 'go to the moon',
    userId: 2,
  },
  {
    description: 'become a jedi',
    userId: 1,
  },
  {
    description: 'write a todo app',
    status: 'PENDING',
    userId: 2,
  },
  {
    description: 'fold laundry',
    status: 'PENDING',
    userId: 1,
  },
  {
    description: 'write a todo app',
    status: 'PENDING',
    userId: 1,
  },
  {
    description: 'eat breakfast',
    status: 'COMPLETE',
    userId: 2,
  },
  {
    description: 'play soccer',
    status: 'COMPLETE',
    userId: 1,
  },
  {
    description: 'be amazing',
    status: 'COMPLETE',
    userId: 1,
  },
]

const todoSeeder = async () => {
  return db.todo.createMany({
    data: todos,
  })
}

module.exports.todoSeeder = todoSeeder
