import { useContext, useState } from 'react'
import { Button, Card, CardActions, CardContent, TextField } from '@mui/material'
import AuthContext from '../util/contexts/AuthContext'
import styles from '../styles/Login.module.css'
import { loginFn, registerFn } from '../services/react/LoginService'

const Login = () => {
  const [ username, setUsername ] = useState( '' )
  const [ password, setPassword ] = useState( '' )
  const [ confirmedPassword, setConfirmedPassword ] = useState( '' )
  const [ register, setRegister ] = useState( false )
  const { dispatch } = useContext( AuthContext )

  return (
    <Card variant='outlined'>
      <h1 className={styles.h1}>
        Login
      </h1>
      <CardContent className={styles.content} >
        <TextField
          required
          className={styles.input}
          label='Username'
          value={username}
          variant='filled'
          onChange={( e ) => {
            setUsername( e.target.value )
          }}
        />
        <TextField
          required
          className={styles.input}
          label='Password'
          type='password'
          value={password}
          variant='filled'
          onChange={( e ) => {
            setPassword( e.target.value )
          }}
        />
        { register && (
          <TextField
            required
            className={styles.input}
            label='Confirm Password'
            type='password'
            value={confirmedPassword}
            variant='filled'
            error={!!confirmedPassword && ( password !== confirmedPassword )}
            onChange={( e ) => {
              setConfirmedPassword( e.target.value )
            }}
          />
        )}
      </CardContent>
      <CardActions className={styles.actions} >
        { !register && (
          <Button
            className={styles.button}
            type='submit'
            variant='contained'
            onClick={() => {
              loginFn( dispatch, username, password )
            }}
          >
            Login
          </Button>
        )}
        { register && (
          <Button
            className={styles.button}
            type='submit'
            variant='contained'
            onClick={() => {
              if ( confirmedPassword === password ) {
                registerFn( dispatch, username, password )
              }
            }}
          >
            Create Account
          </Button>
        )}
        <Button
          onClick={() => {
            setRegister( !register )
          }}
        >
          {register ? 'Already' : "Don't"} Have an Account?
        </Button>
      </CardActions>
    </Card>
  )
}

export default Login
