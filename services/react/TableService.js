import axios from 'axios'
import { toast } from 'react-toastify'
// import { rows } from '../../data/rows'
// import { allPending } from '../../data/allPending'

export const notify = ( response ) => {
  switch ( response.status ) {
  case 500:
    toast.error( response.message )
    break
  case 200:
  case 201:
    toast.success( response?.data?.message )
    break
  case 204:
    toast.success( 'Todo deleted' )
    break
  default:
    // do nothing
  }
}

export const getRows = async () => {
  // add error handling
  const { data: { todos } } = await axios.get( '/api/todo' )
  return todos

  // switch comments for local data instead of planetscale DB data
  // return rows
}

export const getFilteredRows = async ( query ) => {
  // add error handling
  const { data: { todos } } = await axios.get( `/api/todo?${query}` )
  return todos
}

export const addItemToDB = async ( todo ) => {
  try {
    const response = await axios.post( 'api/todo', todo )

    return response
  } catch ( error ) {
    const { response: { data: { message }, status } } = error
    console.error( message )

    return { message, status }
  }
}

export const deleteTodoFromDB = async ( id ) => {
  try {
    const response = await axios.delete( 'api/todo', { data: id })

    return response
  } catch ( error ) {
    const { response: { data: { message }, status } } = error
    console.error( message )

    return { message, status }
  }
}

export const updateTodo = async ( id, field, newFieldValue ) => {
  try {
    const response = await axios.patch( '/api/todo', { id, field, newFieldValue })  
    
    return response
  } catch ( error ) {
    const { response: { data: { message }, status } } = error
    console.error( message )

    return { message, status }
  }
}
