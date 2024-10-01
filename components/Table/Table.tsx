'use client';
import { Ticket } from "@/types";
import styles from './Table.module.scss'
import { getStatusColor, parseDate } from "@/helpers";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { FaCircle } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";
import { IconContext } from "react-icons";
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

interface TableProps {
  tickets: Ticket[]
}

interface TableHeaderProps {
  currentSortOrder: string
  label: string
}

const Table: React.FunctionComponent<TableProps> = (props) => {

  const searchParams = useSearchParams()
  const orderBy = searchParams.get('orderBy') ?? 'Номер'

  return (
    <div className={styles.tableContainer}>
    <table className={styles.table}>
        <thead>
          <tr className={styles.tableHead}>
            <TableHeader currentSortOrder={orderBy} label="Тема"/>
            <TableHeader currentSortOrder={orderBy} label="Номер"/>
            <TableHeader currentSortOrder={orderBy} label="Дата создания"/>
            <TableHeader currentSortOrder={orderBy} label="Дата изменения"/>
            <TableHeader currentSortOrder={orderBy} label="Крайний срок"/>
            <TableHeader currentSortOrder={orderBy} label="Состояние"/>
          </tr>
        </thead>
        <tbody>
            {props.tickets.map(ticket => <tr className={styles.tableRow} key={ticket.id}>
                <td><div className={styles.withIcon}><Link className={styles.link} href={`/dashboard/${ticket.id}`} >{ticket.label}</Link>
                {ticket.needs_feedback ? <FaTriangleExclamation style={{color: 'red', marginLeft: '0.5em'}}/> : <></>}
                </div></td>
                <td>{`№ ${ticket.id.padStart(10, '0')}`}</td>
                <td>{ticket.opened}</td>
                <td>{ticket.modified}</td>
                <td>{ticket.deadline}</td>
                <td>{<div  className={styles.withIcon}>
                <FaCircle style={{color: getStatusColor(ticket.status), marginRight: '0.5em'}} size='0.6em'/>
                {ticket.status}
                </div>}</td>
            </tr>)}
        </tbody>
    </table>
    </div>
  );
};

const TableHeader: React.FunctionComponent<TableHeaderProps> = ({currentSortOrder, label}) => {

  const searchParams = useSearchParams()
  const router = useRouter()
  const orderBy = searchParams.get('orderBy') ?? 'Номер'
  const isAscending: boolean = searchParams.get('isAscending') === 'true' ?? true

  const handleClick = () => {
    router.push(`/dashboard/?orderBy=${label}&isAscending=${currentSortOrder === label ? !isAscending: 'false'}`)
  }

  return (
    <th onClick={() => handleClick()}>
      <div className={styles.thCenter}>
      <IconContext.Provider value={{ size: '1.5em', style:{ color: 'deepskyblue', visibility: currentSortOrder === label ? 'visible' : 'hidden' }}}>
      { 
        isAscending? <>{label} <GoTriangleUp/></> :
        <>{label} <GoTriangleDown/></> 
      }
      </IconContext.Provider>
      </div>
    </th>
  )
}

export default Table;
