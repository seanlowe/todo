import axios from 'axios'

const lookUpUser = async ( username ) => {
  try {
    const { data: { user } } = await axios.get( `/api/user?username=${username}` )
  
    return user
  } catch ( error ) {
    const { response: { data: { message }, status } } = error

    return { status, message }
  }
}

export const loginFn = async ( dispatch, username, plainTextPassword ) => {
  const user = await lookUpUser( username )

  if ( user?.status === 404 ) {
    return { ...user }
  }

  if ( user ) {
    const userInformation = {
      ...user,
      enteredPassword: plainTextPassword
    }

    try {
      const response = await axios.post( '/api/login', userInformation )

      const { data: { id: userId, username: name }, status } = response

      // authContext uses 'userId' instead of 'id' for clarity
      dispatch({ type: 'signIn', payload: { userId, name } })

      return { status, message: 'success' }
    } catch ( error ) {
      const { response: { data: { message }, status } } = error
      console.log( message )

      return { status, message }
    }
  }
}

export const registerFn = async ( dispatch, username, plainTextPassword ) => {
  if ( username === '' || plainTextPassword === '' ) {
    return { status: 403, message: 'Username and Password are required.' }
  }

  const user = await lookUpUser( username )
  if ( user?.username ) {
    return { status: 403, message: 'A user already exists with that username.' }
  }

  const userInformation = {
    username, 
    enteredPassword: plainTextPassword
  }

  try {
    const response = await axios.post( '/api/user', userInformation )

    const { data: { id: userId, username: name }, status } = response

    dispatch({ type: 'signIn', payload: { userId, name } })

    return { status, message }
  } catch ( error ) {
    const { response: { data: { message }, status } } = error
    console.log( message )

    return { status, message }
  }
}
