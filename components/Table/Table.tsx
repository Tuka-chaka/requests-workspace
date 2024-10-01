'use client';
import { Ticket } from "@/types";
import { useEffect, useState } from "react";
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
  onSort: (callback: (a: Ticket, b: Ticket) => number, label: string, isAscending: boolean) => void
  sortFunction: (a: Ticket, b: Ticket) => number
  currentSortOrder: string
  label: string
}

const Table: React.FunctionComponent<TableProps> = (props) => {

  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [tickets, setTickets] = useState(props.tickets)
  const [sortOrder, setSortOrder] = useState("none")

  const handleClick = (sortFunction: (a: Ticket, b: Ticket) => number, label: string, isAscending: boolean) => {
    const nextTickets = [...tickets]
    // nextTickets.sort(sortFunction)
    // if (!isAscending) {
    //   nextTickets.reverse()
    // }
    setTickets(nextTickets)
    setSortOrder(label)
    console.log(isAscending)
    router.push(`/dashboard/?orderBy=${label}&isAscending=${isAscending}`)
  }

  return (
    <div className={styles.tableContainer}>
    <table className={styles.table}>
        <thead>
          <tr className={styles.tableHead}>
            <TableHeader currentSortOrder={sortOrder} label="Тема" onSort={handleClick} sortFunction={(a, b) => a.label.localeCompare(b.label)}/>
            <TableHeader currentSortOrder={sortOrder} label="Номер" onSort={handleClick} sortFunction={(a, b) => parseInt(a.id) - parseInt(b.id)}/>
            <TableHeader currentSortOrder={sortOrder} label="Дата создания" onSort={handleClick} sortFunction={(a, b) => parseDate(a.opened).getTime() - parseDate(b.opened).getTime()}/>
            <TableHeader currentSortOrder={sortOrder} label="Дата изменения" onSort={handleClick} sortFunction={(a, b) => parseDate(a.modified).getTime() - parseDate(b.modified).getTime()}/>
            <TableHeader currentSortOrder={sortOrder} label="Крайний срок" onSort={handleClick} sortFunction={(a, b) => parseDate(a.deadline).getTime() - parseDate(b.deadline).getTime()}/>
            <TableHeader currentSortOrder={sortOrder} label="Состояние" onSort={handleClick} sortFunction={(a, b) => a.status.localeCompare(b.status)}/>
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

const TableHeader: React.FunctionComponent<TableHeaderProps> = ({currentSortOrder, label, onSort, sortFunction}) => {

  const [isAscending, setIsAscending] = useState(true)

  useEffect(() => {

    setIsAscending(currentSortOrder !== label)

  }, [currentSortOrder, label])

  const handleClick = () => {
    if (currentSortOrder === label) {
      setIsAscending(isAscending => !isAscending)
    }
    onSort(sortFunction, label, isAscending)
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
