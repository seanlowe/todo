import { useReducer } from 'react'
import AuthContext from '../util/contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'

const initialState = {
  name: '',
  userId: null,
  status: 'unauthenticated',
}

const authReducer = ( state, action ) => {
  switch ( action.type ) {
  case 'signIn':
    return {
      name: action.payload.name,
      userId: action.payload.userId,
      status: 'authenticated',
    }
  case 'signOut':
    return {
      name: '',
      userId: null,
      status: 'unauthenticated',
    }
  default:
    throw new Error( `No matching action defined in authReducer (${type})` )
  }
}

function init() {
  return initialState
}

function MyApp({ Component, pageProps }) {
  const [ state, dispatch ] = useReducer( authReducer, {}, init )

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </AuthContext.Provider>
  )
}

export default MyApp
