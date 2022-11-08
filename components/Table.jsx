import React, { useState } from 'react'
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

// switch initial data to be fetched from DB
import { rows as initialRows } from '../data/rows'

import styles from '../styles/Table.module.css'

const CustomTable = () => {
  const [ rows, setRows ] = useState( initialRows )

  const addItem = () => {
    const temp = rows.slice()
    const id = Math.random()

    temp.push({
      id,
      description: `short task name ${id}`,
      status: 'new'
    })

    setRows( temp )
  }

  const advanceItem = ( action, id ) => {
    const temp = rows.slice()
    const newStatus = action === 'complete' ? action : 'pending'

    const item = temp.find(( item ) => {
      return item.id === id 
    })
    item.status = newStatus

    setRows( temp )
  }

  const deleteItem = ( id ) => {
    const temp = rows.slice().filter(( item ) => {
      return item.id !== id
    })

    setRows( temp )
  }

  const editItem = ( id ) => {
    console.log( 'edit' )
  }

  const rowItemCallback = ( action, id ) => {
    switch ( action ) {
    case 'complete':
    case 'start':
      advanceItem( action, id )
      return
    case 'delete':
      deleteItem( id )
      return
    case 'edit':
      editItem( id )
      return
    default:
        // do nothing
    }
  }

  return (
    <div className={styles.wrapper}>
      <ActionsBar addFn={addItem} />
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
              <WatermarkItem />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CustomTable
