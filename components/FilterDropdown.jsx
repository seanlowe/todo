import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import styles from '../styles/FilterDropdown.module.css'

const FilterDropdown = ({ isOpen, openCloseFn, filterCallback }) => {
  const [ selectedValue, setSelectedValue ] = useState( 'ALL' )

  const handleClose = () => {
    openCloseFn( false )
  }

  const handleOpen = () => {
    openCloseFn( true )
  }

  const handleChange = ( event ) => {
    const newValue = event.target.value
    filterCallback( newValue )
    
    setSelectedValue( newValue )
    handleClose()
  }

  return (
    <div>
      <Select
        className={styles.dropdown}
        onChange={handleChange}
        onClose={handleClose}
        onOpen={handleOpen}
        open={isOpen}
        value={selectedValue}
      >
        <MenuItem value='ALL'> All </MenuItem>
        <MenuItem value='NEW'> New </MenuItem>
        <MenuItem value='PENDING'> Pending </MenuItem>
        <MenuItem value='COMPLETE'> Complete </MenuItem>
      </Select>
    </div>
  )
}

export default FilterDropdown
