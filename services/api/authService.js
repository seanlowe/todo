import { db } from '../../util/scripts/js/check-db-connection'
import * as bcrypt from 'bcrypt'

const saltRounds = parseInt( process.env.SALT_ROUNDS )

const generateHash = async ( enteredPassword ) => {
  const salt = await bcrypt.genSalt( saltRounds )

  const hash = await bcrypt.hash( enteredPassword, salt )
  
  return hash
}

export const getUser = async ( query, res ) => {
  const user = await db.user.findUnique({
    where: { ...query }
  })

  return res.status( 200 ).json({ user })
}

export const login = async ( body, res ) => {
  const { id, username, password: storedPasswordHash, enteredPassword } = body

  const match = await bcrypt.compare( enteredPassword, storedPasswordHash )

  if ( match ) {
    return res.status( 200 ).json({ message: 'credentials accepted', userId: id, username })
  }

  return res.status( 403 ).json({ message: 'not authorized, bad login creds' })
}
