import * as bcrypt from 'bcrypt'

export const login = async ( body, res ) => {
  const { id, username, password: storedPasswordHash, enteredPassword } = body

  const match = await bcrypt.compare( enteredPassword, storedPasswordHash )

  if ( match ) {
    return res.status( 200 ).json({ message: 'credentials accepted', id, username })
  }

  return res.status( 403 ).json({ message: 'Either username or password is incorrect.' })
}
