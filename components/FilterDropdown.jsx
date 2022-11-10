import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const FilterDropdown = ({ isOpen, openCloseFn, filterCallback }) => {
  const [ selectedValue, setSelectedValue ] = useState( 'ALL' )

  const handleChange = ( event ) => {
    const newValue = event.target.value
    filterCallback( newValue )
    
    setSelectedValue( newValue )
    openCloseFn( false )
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          open={isOpen}
          onClose={() => {
            openCloseFn( false )
          }}
          onOpen={() => {
            openCloseFn( true )
          }}
          value={selectedValue}
          onChange={handleChange}
          sx={{
            visibility: 'hidden',
            position: 'absolute',
            marginTop: -8,
            left: 75,
            bottom: 10
          }}
        >
          <MenuItem value='ALL'>
            <em>All</em>
          </MenuItem>
          <MenuItem value={'NEW'}>New</MenuItem>
          <MenuItem value={'PENDING'}>Pending</MenuItem>
          <MenuItem value={'COMPLETE'}>Completed</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default FilterDropdown
