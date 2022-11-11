import axios from 'axios'
import { toast } from 'react-toastify'

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

const buildQueryParams = ( queryObject ) => {
  let paramString = ''
  for ( const [ key, value ] of Object.entries( queryObject )) {
    paramString += `&${key}=${value}`
  }

  // remove the first, unnecessary '&'
  return paramString.slice( 1 )
}

export const getFilteredRows = async ( query ) => {
  const params = buildQueryParams( query )

  try {
    const { data: { todos } } = await axios.get( `/api/todo?${params}` )

    return todos
  } catch ( error ) {
    console.log( error )

    return []
  }
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
