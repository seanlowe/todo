import { useState } from 'react'
import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import styles from '../../styles/RowItem.module.css'
import EditDialog from '../EditDialog'

const RowItem = ({ id, description = null, status = null, callback, }) => {
  const [ editModalOpen, setEditModalOpen ] = useState( false )
  const descr = description || 'new task'
  const stat  = status || 'new'

  return (
    <TableRow>
      <TableCell
        className={styles.description}
        colSpan={ 6 }
      >
        { descr }
      </TableCell>
      <TableCell
        className={styles.status}
        colSpan={ 3 }
        align='right'
      >
        { stat }
      </TableCell>
      <TableCell colSpan={ 3 } align='right'>
        <Button
          style={{ visibility: stat === 'new' ? 'visible' : 'hidden' }}
          onClick={() => {
            return callback( 'start', id ) 
          }}
        >
            Start
        </Button>
        <Button
          style={{ visibility: stat !== 'complete' ? 'visible' : 'hidden' }}
          onClick={() => {
            return callback( 'complete', id )
          }}
        >
            Complete
        </Button>
        <Button
          onClick={() => {
            setEditModalOpen( true )
          }}
        >
          <EditIcon />
        </Button>
        <EditDialog
          description={descr}
          open={editModalOpen}
          setModelOpen={setEditModalOpen}
          callback={() => {
            return callback( 'edit', id )
          }}
        />
        <Button
          onClick={() => {
            return callback( 'delete', id ) 
          }}
        > 
          <DeleteIcon /> 
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default RowItem
