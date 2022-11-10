import * as todoService from '../../services/api/todoService'

const destroy = async ( req, res ) => {
  const { body: id } = req

  return await todoService.deleteTodo( parseInt( id ), res )
}

const get = async ( req, res ) => {
  const { query } = req

  if ( !Object.keys( query ).length ) {
    // no query was provided (i.e. no filtering),
    // so just return all todo entries
    return await todoService.getAllTodos( res )
  } else {
    return await todoService.getFilteredTodos( query, res )
  }
}

const store = async ( req, res ) => {
  const { body: todoToCreate } = req
  const response = await todoService.addNewTodo( todoToCreate, res )
  return response
}

const update = async ( req, res ) => {
  const { body } = req

  const response = await todoService.updateTodo( body, res )
  return response
}

export default async function handler( req, res ) {
  switch ( req.method ) {
  case 'DELETE':
    return destroy( req, res )
  case 'GET':
    return get( req, res )
  case 'PATCH':
    return update( req, res )
  case 'POST':
    return store( req, res )
  default:
    console.error( 'there was an error, no applicable action:', req.method )
    break
  }

  res.end()
}
