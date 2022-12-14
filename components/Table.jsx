import React, { useEffect, useState, useContext } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import RowItem from './RowItem/RowItem'
import WatermarkItem from './RowItem/WatermarkedRowItem'
import ActionsBar from './ActionsBar/ActionsBar'
import styles from '../styles/Table.module.css'
import * as TableService from '../services/react/TableService'
import AuthContext from '../util/contexts/AuthContext'

const CustomTable = () => {
  const [ rows, setRows ] = useState( [] )
  const [ filterStatus, setFilterStatus ] = useState( 'ALL' )
  const { state: { userId } } = useContext( AuthContext )


  const retrieveRows = async ( filter = '' ) => {
    const query = {
      userId,
      status: filter ? `${filter}` : `${filterStatus}`
    }

    const rows = await TableService.getFilteredRows( query )

    setRows( rows )
  }

  useEffect(() => {
    retrieveRows()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  const notifyAndRetrieveRows = async ( response ) => {
    TableService.notify( response )

    await retrieveRows()
  }

  const addItem = async ( value ) => {
    const entry = {
      description: value,
      status: 'NEW',
      userId,
    }

    TableService.addItemToDB( entry ).then( async ( response ) => {
      await notifyAndRetrieveRows( response )
    })
  }

  const deleteItem = ( id ) => {
    TableService.deleteTodoFromDB( id ).then( async ( response ) => {
      await notifyAndRetrieveRows( response )
    })
  }

  const updateItem = ( id, field, newFieldValue ) => {
    TableService.updateTodo( id, field, newFieldValue ).then( async ( response ) => {
      await notifyAndRetrieveRows( response )
    })
  }

  const rowItemCallback = ( action, id, field = '', value = '' ) => {
    switch ( action ) {
    case 'delete':
      deleteItem( id )
      break
    case 'update':
      updateItem( id, field, value )
    default:
      // do nothing
    }
  }

  return (
    <div className={styles.wrapper}>
      <ActionsBar
        addFn={addItem}
        filterStatus={filterStatus}
        filterFn={( filterValue ) => {
          setFilterStatus( filterValue )
          retrieveRows( filterValue )
        }}
      />
      <TableContainer
        className={styles.container}
        component={Paper}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell colSpan={ 6 }> <b> Description </b> </TableCell>
              <TableCell colSpan={ 3 } align='right'> <b> Status </b> </TableCell>
              <TableCell colSpan={ 3 } align='right'> <b> Actions </b> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map(( row ) => {
              return (
                <RowItem
                  key={row.id}
                  id={row.id}
                  description={row.description}
                  status={row.status}
                  callback={rowItemCallback}
                />
              )
            })}
            {rows.length === 0 && (
              // add loading indicator here
              <WatermarkItem />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CustomTable
