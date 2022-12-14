import { db } from '../../util/scripts/js/check-db-connection'
import * as bcrypt from 'bcrypt'

const salt = process.env.SALT_VALUE

const generateHash = async ( enteredPassword ) => {
  const hash = await bcrypt.hash( enteredPassword, salt )

  return hash
}

export const createUser = async ( user, res ) => {
  const { username, enteredPassword } = user

  if ( username === '' ) {
    return res.status( 500 ).json({
      message: 'Username is required.'
    })
  }

  const hashedPassword = await generateHash( enteredPassword )

  try {
    const createdUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })

    return res.status( 201 ).json({
      message: 'Account created',
      id: createdUser.id,
      username: createdUser.username
    })
  } catch ( error ) {
    return res.status( 500 ).json({
      message: 'Failed to create new user account.'
    })
  }
}

export const getUser = async ( query, res ) => {
  try {
    const user = await db.user.findUnique({
      where: { ...query }
    })

    if ( !user ) {
      throw new Error( 'no such user' )
    }
  
    return res.status( 200 ).json({ user })
  } catch ( error ) {
    return res.status( 404 ).json({ message: 'No user by that username.' })
  }
}
