import { useContext, useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material'
import AuthContext from '../../util/contexts/AuthContext'
import styles from '../styles/Login.module.css'
import { loginFn } from '../../services/react/LoginService'

const Register = () => {
  const [ username, setUsername ] = useState( '' )
  const [ password, setPassword ] = useState( '' )
  const { dispatch } = useContext( AuthContext )

  const handleLogin = () => {
    dispatch({ type: 'signIn' })
  }

  return (
    <Card variant='outlined'>
      <h1 className={styles.h1}>
        Login
      </h1>
      <CardContent className={styles.content} >
        <TextField
          autoComplete={false}
          className={styles.input}
          label='Username'
          value={username}
          variant='filled'
          onChange={( e ) => {
            setUsername( e.target.value )
          }}
        />
        <TextField
          autoComplete={false}
          className={styles.input}
          label='Password'
          type='password'
          value={password}
          variant='filled'
          onChange={( e ) => {
            setPassword( e.target.value )
          }}
        />
        <TextField
          autoComplete={false}
          className={styles.input}
          label='Confirm Password'
          type='password'
          value={password}
          variant='filled'
          onChange={( e ) => {
            setPassword( e.target.value )
          }}
        />
      </CardContent>
      <CardActions className={styles.actions} >
        <Button
          className={styles.button}
          type='submit'
          variant='contained'
          // onClick={handleLogin}
          onClick={() => {
            loginFn( dispatch, username, password )
          }}
        >
          Create Account
        </Button>
      </CardActions>
    </Card>
  )
}

export default Register
