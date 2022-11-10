import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

const TaskDialog = ({ open, setModelOpen, callback, description, create = false }) => {
  const [ newDescriptionValue, setNewDescriptionValue ] = useState( create ? '' : description )
  const cancelModal = () => {
    setNewDescriptionValue( description )
    setModelOpen( false )
  }

  const closeModal = () => {
    setModelOpen( false )
  }

  const handleChange = ( event ) => {
    setNewDescriptionValue( event?.target?.value )
  }

  const handleConfirm = async ( e ) => {
    e.preventDefault()
    await callback( newDescriptionValue )
    
    if ( create ) {
      setNewDescriptionValue( '' )
    }

    closeModal()
  }

  return (
    <Dialog open={open} onClose={closeModal} maxWidth='sm' fullWidth>
      <DialogTitle>{create ? 'New' : 'Edit'} Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
            Write the task&apos;s description here.
        </DialogContentText>
        <TextField
          autoFocus
          value={newDescriptionValue}
          fullWidth
          label='Description'
          multiline
          onChange={handleChange}
          rows={4}
          sx={{
            marginTop: 1.5
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelModal}> Cancel </Button>
        <Button
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskDialog
