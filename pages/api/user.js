import * as userService from '../../services/api/userService'

const get = async ( req, res ) => {
  const { query } = req

  return await userService.getUser( query, res )
}

const store = async ( req, res ) => {
  const { body: userToCreate } = req
  const response = await userService.createUser( userToCreate, res )

  return response
}

export default async function handler( req, res ) {
  switch ( req.method ) {
  case 'GET':
    return get( req, res )
  case 'POST':
    return store( req, res )
  default:
    console.error( 'there was an error, no applicable action:', req.method )
    break
  }

  res.end()
}
