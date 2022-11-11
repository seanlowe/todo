import axios from 'axios'

const lookUpUser = async ( username ) => {
  const { data: { user } } = await axios.get( `/api/user?username=${username}` )

  return user
}

export const loginFn = async ( dispatch, username, plainTextPassword ) => {
  const user = await lookUpUser( username )

  if ( user ) {
    const userInformation = {
      ...user,
      enteredPassword: plainTextPassword      
    }

    try {
      const response = await axios.post( '/api/login', userInformation )

      const { data: { id: userId, username: name } } = response

      // authContext uses 'userId' instead of 'id' for clarity
      dispatch({ type: 'signIn', payload: { userId, name } })
    } catch ( error ) {
      const { response: { data: { message } } } = error
      console.log( message )
    }
  }
}

export const registerFn = async ( dispatch, username, plainTextPassword ) => {
  const userInformation = {
    username, 
    enteredPassword: plainTextPassword
  }

  try {
    const response = await axios.post( '/api/user', userInformation )

    const { data: { id: userId, username: name } } = response

    dispatch({ type: 'signIn', payload: { userId, name } })
  } catch ( error ) {
    const { response: { data: { message } } } = error
    console.log( message )
  }
}
