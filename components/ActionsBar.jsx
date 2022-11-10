import { useState } from 'react'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from '@mui/icons-material/FilterList'
import styles from '../styles/ActionsBar.module.css'
import TaskDialog from './TaskDialog'
import FilterDropdown from './FilterDropdown'

const ActionsBar = ({ addFn, filterStatus = 'ALL', filterFn }) => {
  const [ taskModalOpen, setTaskModalOpen ] = useState( false )
  const [ filterModalOpen, setFilterModalOpen ] = useState( false )

  return (
    <Toolbar className={styles.toolbar}>
      <div className={styles.wrapper}>
        <Button
          className={styles.button}
          onClick={() => {
            setTaskModalOpen( true )
          }}
        >
          <p className={styles.text}> Add Task </p>
          <AddIcon />
        </Button>
        <TaskDialog
          create
          open={taskModalOpen}
          setModelOpen={setTaskModalOpen}
          callback={async ( descriptionValue ) => {
            return await addFn( descriptionValue )
          }}
        />
        <Button
          className={styles.button}
          onClick={() => {
            setFilterModalOpen( true )
          }}
        >
          <p className={styles.text}> { filterStatus } </p>
          <FilterListIcon />
        </Button>
        <FilterDropdown
          isOpen={filterModalOpen}
          openCloseFn={setFilterModalOpen}
          filterCallback={filterFn}
        />
      </div>
    </Toolbar>
  )
}

export default ActionsBar
