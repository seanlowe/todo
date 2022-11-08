import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { buttons } from '../../data/buttons'
import styles from '../../styles/RowItem.module.css'

const WatermarkedRowItem = () => {
  return (
    <TableRow>
      <TableCell
        className={styles.description}
        colSpan={ 6 }
      />
      <TableCell
        className={styles.status}
        colSpan={ 3 }
        align='right'
      >
        no records found
      </TableCell>
      <TableCell colSpan={ 3 } align='right'>
        {buttons.map(( btn ) => {
          return (
            <Button key={btn.id} className={styles.hidden}>
              {btn.content}
            </Button>
          )
        })}
      </TableCell>
    </TableRow>
  )
}

export default WatermarkedRowItem
