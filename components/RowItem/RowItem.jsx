import { useState } from 'react'
import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import styles from '../../styles/RowItem.module.css'
import TaskDialog from '../TaskDialog'
import * as _ from 'lodash'

const RowItem = ({ id, description = null, status = null, callback, }) => {
  const [ taskModalOpen, setTaskModalOpen ] = useState( false )
  const descr = description || 'new task'
  const stat  = status?.toLowerCase() || 'new'

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
        { _.startCase( stat )}
      </TableCell>
      <TableCell colSpan={ 3 } align='right'>
        <Button
          style={{ visibility: stat === 'new' ? 'visible' : 'hidden' }}
          onClick={() => {
            return callback( 'update', id, 'status', 'PENDING' ) 
          }}
        >
            Start
        </Button>
        <Button
          style={{ visibility: stat !== 'complete' ? 'visible' : 'hidden' }}
          onClick={() => {
            return callback( 'update', id, 'status', 'COMPLETE' )
          }}
        >
            Complete
        </Button>
        <Button
          onClick={() => {
            setTaskModalOpen( true )
          }}
        >
          <EditIcon />
        </Button>
        <TaskDialog
          description={descr}
          open={taskModalOpen}
          setModelOpen={setTaskModalOpen}
          callback={( newDescriptionValue ) => {
            return callback( 'update', id, 'description', newDescriptionValue )
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
