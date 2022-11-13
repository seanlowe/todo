import { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import AuthContext from '../util/contexts/AuthContext'
import styles from '../styles/Login.module.css'
import { loginFn, registerFn } from '../services/react/LoginService'
import { Paper } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'

const Login = () => {
  const [ username, setUsername ] = useState( '' )
  const [ password, setPassword ] = useState( '' )
  const [ confirmedPassword, setConfirmedPassword ] = useState( '' )
  const [ register, setRegister ] = useState( false )
  const [ loading, setLoading ] = useState( false )
  const [ authError, setAuthError ] = useState( '' )
  const { dispatch } = useContext( AuthContext )

  const signIn = async () => {
    setLoading( true )

    const response = await loginFn( dispatch, username, password )

    if ( response.status === 404 ) {
      setRegister( true )
    }

    if ( response.status !== 200 ) {
      setAuthError( response.message )
    }

    setLoading( false )
  }

  const createAccount = async () => {
    setLoading( true )

    const response = await registerFn( dispatch, username, password )

    if ( response.status !== 200 ) {
      setAuthError( response.message )
    }

    setLoading( false )
  }

  return (
    <Card variant='outlined'>
      <h1 className={styles.h1}>
        Login
      </h1>
      <CardContent className={styles.content} >
        { authError && (
          <Paper
            variant='outlined'
            className={styles.paper}
          >
            <div className={styles.warning}>
              <WarningIcon className={styles.icon} />
              {authError}
            </div>
          </Paper>
        )}
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
          onKeyDown={( e ) => {
            if ( e.key === 'Enter' && !register ) {
              signIn()
            }
          }}
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
            onKeyDown={( e ) => {
              if ( e.key === 'Enter' ) {
                createAccount()
              }
            }}
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
            disabled={loading}
            type='submit'
            variant='contained'
            onClick={signIn}
          >
            <div className={styles.wrapper}>
              { loading && <CircularProgress className={styles.progress} /> }
              <p className={styles.text} > Login </p>
            </div>
          </Button>
        )}
        { register && (
          <Button
            className={styles.button}
            disabled={loading || confirmedPassword !== password}
            type='submit'
            variant='contained'
            onClick={createAccount}
          >
            <div className={styles.wrapper}>
              { loading && <CircularProgress className={styles.progress} /> }
              <p className={styles.text} > Create Account </p>
            </div>
          </Button>
        )}
        <Button
          disabled={loading}
          onClick={() => {
            setRegister( !register )
            setAuthError( '' )
          }}
        >
          {register ? 'Already' : "Don't"} Have an Account?
        </Button>
      </CardActions>
    </Card>
  )
}

export default Login
