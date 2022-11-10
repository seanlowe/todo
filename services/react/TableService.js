import axios from 'axios'
// import { rows } from '../../data/rows'
// import { allPending } from '../../data/allPending'

export const getRows = async () => {
  const { data: { todos } } = await axios.get( '/api/todo' )
  return todos

  // switch comments for local data instead of planetscale DB data
  // return rows
}

export const getFilteredRows = async ( query ) => {
  const { data: { todos } } = await axios.get( `/api/todo?${query}` )
  return todos
}

export const addItemToDB = async ( todo ) => {
  const response = await axios.post( 'api/todo', todo )

  return response
}

export const deleteTodoFromDB = async ( id ) => {
  const response = await axios.delete( 'api/todo', { data: id })

  return response
}

export const updateTodo = async ( id, field, newFieldValue ) => {
  const response = await axios.patch( '/api/todo', { id, field, newFieldValue })
  
  return response
}
