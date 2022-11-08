import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

const EditDialog = ({ open, setModelOpen, callback, description }) => {

  const closeModal = () => {
    setModelOpen( false )
  }
  return (
    <Dialog open={open} onClose={closeModal} maxWidth='sm' fullWidth>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
            Write the task&apos;s new description here.
        </DialogContentText>
        <TextField
          autoFocus
          defaultValue={description}
          fullWidth
          label='Description'
          multiline
          rows={4}
          sx={{
            marginTop: 1.5
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}> Cancel </Button>
        <Button
          onClick={() => {
            callback()
            closeModal()
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditDialog
