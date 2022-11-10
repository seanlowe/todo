import React, { useEffect, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import RowItem from './RowItem/RowItem'
import WatermarkItem from './RowItem/WatermarkedRowItem'
import ActionsBar from './ActionsBar'
import styles from '../styles/Table.module.css'
import * as TableService from '../services/react/TableService'

const CustomTable = () => {
  const [ rows, setRows ] = useState( [] )
  const [ filterStatus, setFilterStatus ] = useState( 'ALL' )
  // @TODO: add loading status for watermark
  // const [ loading, setLoading ] = useState( false )

  const retrieveRows = async ( query = null ) => {
    // setLoading( true )
    let rows = null

    if ( query === 'ALL' || query === 'status=ALL' ) {
      rows = await TableService.getRows()
    } else {
      rows = await TableService.getFilteredRows( query )
    }

    setRows( rows )
    // setLoading( false )
  }

  useEffect(() => {
    retrieveRows( 'ALL' )
  }, [] )

  const addItem = async ( value ) => {
    const entry = {
      description: value,
      status: 'NEW'
    }

    TableService.addItemToDB( entry ).then( async () => {
      await retrieveRows()
    })
  }

  const deleteItem = ( id ) => {
    TableService.deleteTodoFromDB( id ).then( async () => {
      await retrieveRows()
    })
  }

  const updateItem = ( id, field, newFieldValue ) => {
    TableService.updateTodo( id, field, newFieldValue ).then( async () => {
      await retrieveRows()
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
          retrieveRows( `status=${filterValue}` )
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
