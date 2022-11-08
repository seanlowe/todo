import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from '@mui/icons-material/FilterList'
import styles from '../styles/ActionsBar.module.css'

const ActionsBar = ({ addFn }) => {
  return (
    <Toolbar className={styles.toolbar}>
      <div className={styles.wrapper}>
        <Button className={styles.button} onClick={addFn}>
          <p className={styles.text}> Add Task </p>
          <AddIcon />
        </Button>
        <Button className={styles.button}>
          <FilterListIcon />
        </Button>
      </div>
    </Toolbar>
  )
}

export default ActionsBar
