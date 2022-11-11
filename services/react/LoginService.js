import axios from 'axios'


const lookUpUser = async ( username ) => {
  const { data: { user } } = await axios.get( `/api/login?username=${username}` )

  return user
}

// look for username / user id in DB
// if not exist, create user and store hash (register)
// if exist, retrieve hash and check current hash against stored hash
// if match, return userID and login success
// if not match, fail and display toastr

export const loginFn = async ( dispatch, username, plainTextPassword ) => {
  const user = await lookUpUser( username )

  if ( user ) {
    const userInformation = {
      ...user,
      enteredPassword: plainTextPassword      
    }

    const { data, status } = await axios.post( '/api/login', userInformation )

    // add better error handling
    if ( status === 403 ) {
      console.log( 'DENIED!' )

      return
    }

    dispatch({ type: 'signIn', payload: { userId: data.userId, name: data.username } })
  }
}
