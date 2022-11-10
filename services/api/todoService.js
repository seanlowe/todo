import { db } from '../../util/scripts/js/check-db-connection'

export const addNewTodo = async ( todoToCreate, res ) => {
  const todo = await db.todo.create({
    data: {
      description: todoToCreate.description,
      status: todoToCreate.status,
    },
  })

  return res.status( 201 ).json({ message: 'create successful', todo })
}

export const deleteTodo = async ( id, res ) => {
  const todo = await db.todo.delete({
    where: { id }
  })

  return res.status( 200 ).json({ message: 'delete successful' })
}

export const getAllTodos = async ( res ) => {
  const todos = await db.todo.findMany()

  return res.status( 200 ).json({ todos })
}

export const getFilteredTodos = async ( query, res ) => {
  const todos = await db.todo.findMany({
    where: { ...query }
  })

  return res.status( 200 ).json({ todos })
}

export const updateTodo = async ({ id, field, newFieldValue }, res ) => {
  const todo = await db.todo.update({
    where: { id },
    data: { [field]: newFieldValue },
  })

  return res.status( 200 ).json({ message: 'update successful', todo })
}
