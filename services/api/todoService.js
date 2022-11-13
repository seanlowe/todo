import { db } from '../../util/scripts/js/check-db-connection'

export const addNewTodo = async ( todoToCreate, res ) => {
  try {
    const todo = await db.todo.create({
      data: {
        description: todoToCreate.description,
        status: todoToCreate.status,
        userId: todoToCreate.userId,
      },
    })

    return res.status( 201 ).json({ message: 'Todo created', todo })
  } catch ( error ) {
    return res.status( 500 ).json({
      message: 'Failed to create new entry.'
    })
  }
}

export const deleteTodo = async ( id, res ) => {
  try {
    await db.todo.delete({
      where: { id }
    })

    return res.status( 204 ).end()
  } catch ( error ) {
    return res.status( 500 ).json({
      message: `Failed to delete entry with id: ${id}`
    })
  }
}

export const getTodos = async ( query, res ) => {
  try {
    const todos = await db.todo.findMany({
      where: { ...query }
    })
  
    return res.status( 200 ).json({ todos })
  } catch ( error ) {
    return res.status( 500 ).json({
      message: 'Failed to retrieve todos'
    })
  }

}

export const updateTodo = async ({ id, field, newFieldValue }, res ) => {
  try {
    const todo = await db.todo.update({
      where: { id },
      data: { [field]: newFieldValue },
    })

    return res.status( 200 ).json({ message: 'Todo updated', todo })
  } catch ( error ) {
    return res.status( 500 ).json({
      message: `Failed to update the ${field} field on entry with id: ${id}`
    })
  }
}
