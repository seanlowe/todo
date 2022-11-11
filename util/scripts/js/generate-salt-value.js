// short script to generate a salt value so that all hashed
// passwords can be consistently checked against. Kind of
// a hoax of a more secure authentication but it works

const bcrypt = require( 'bcrypt' )

const getData = () => {
  return new Promise(( resolve, reject ) => {
    resolve( bcrypt.genSalt( 10 ))
  })
}

const data = getData()
data
  .then(( result ) => {
    console.log( result )
  })
  .catch(( error ) => {
    console.log( error )
  })
