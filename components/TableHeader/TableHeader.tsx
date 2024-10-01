'use client';
import styles from './TableHeader.module.scss'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { IconContext } from "react-icons";
import { useRouter, useSearchParams } from 'next/navigation'

interface TableHeaderProps {
  label: string
}

const TableHeader: React.FunctionComponent<TableHeaderProps> = ({label}) => {

  const searchParams = useSearchParams()
  const router = useRouter()
  const orderBy = searchParams.get('orderBy') ?? 'Номер'
  const isAscending: boolean = searchParams.get('isAscending') === 'true' ?? true
  const page = searchParams.get('page') ?? '0'

  const handleClick = () => {
    router.push(`/dashboard/?orderBy=${label}&isAscending=${orderBy === label ? !isAscending: 'false'}&page=${page}`)
  }

  return (
    <th onClick={() => handleClick()}>
      <div className={styles.thCenter}>
      <IconContext.Provider value={{ size: '1.5em', style:{ color: 'deepskyblue', visibility: orderBy === label ? 'visible' : 'hidden' }}}>
      { 
        isAscending? <>{label} <GoTriangleUp/></> :
        <>{label} <GoTriangleDown/></> 
      }
      </IconContext.Provider>
      </div>
    </th>
  )
}

export default TableHeader;
