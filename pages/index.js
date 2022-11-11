import { useContext } from 'react'
import Layout from '../components/layout'
import Login from '../components/Auth/Login'
import CustomTable from '../components/Table'
import AuthContext from '../util/contexts/AuthContext'

export default function Home() {
  const { state: { status } } = useContext( AuthContext )

  return (
    <Layout>
      {status === 'authenticated' && (
        <CustomTable />
      )}
      { status === 'unauthenticated' && (
        <Login />
      )}
    </Layout>
  )
}
