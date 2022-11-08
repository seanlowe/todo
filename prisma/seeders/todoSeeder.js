#! /usr/local/bin/node

const { db } = require( '../../util/scripts/js/check-db-connection' )

const todos = [
  {
    description: 'learn golang'
  },
  {
    description: 'go to the moon'
  },
  {
    description: 'become a jedi'
  },
  {
    description: 'write a todo app',
    status: 'PENDING'
  },
  {
    description: 'fold laundry',
    status: 'PENDING'
  },
  {
    description: 'write a todo app',
    status: 'PENDING'
  },
  {
    description: 'eat breakfast',
    status: 'COMPLETE'
  },
  {
    description: 'play soccer',
    status: 'COMPLETE'
  },
  {
    description: 'be amazing',
    status: 'COMPLETE'
  },
]

const todoSeeder = async () => {
  return db.todo.createMany({
    data: todos,
  })
}

module.exports.todoSeeder = todoSeeder
