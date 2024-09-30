'use client';
import { Ticket } from "@/types";
import { useEffect, useState } from "react";
import styles from './Table.module.scss'
import { parseDate } from "@/helpers";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

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
  
  const [tickets, setTickets] = useState(props.tickets)
  const [sortOrder, setSortOrder] = useState("none")

  const handleClick = (sortFunction: (a: Ticket, b: Ticket) => number, label: string, isAscending: boolean) => {
    const nextTickets = [...tickets]
    nextTickets.sort(sortFunction)
    if (!isAscending) {
      nextTickets.reverse()
    }
    setTickets(nextTickets)
    setSortOrder(label)
    console.log(isAscending)
  }

  return (
    <table className={styles.table}>
        <thead>
          <tr>
            <TableHeader currentSortOrder={sortOrder} label="Тема" onSort={handleClick} sortFunction={(a, b) => a.label.localeCompare(b.label)}/>
            <TableHeader currentSortOrder={sortOrder} label="Номер" onSort={handleClick} sortFunction={(a, b) => parseInt(a.id) - parseInt(b.id)}/>
            <TableHeader currentSortOrder={sortOrder} label="Дата создания" onSort={handleClick} sortFunction={(a, b) => parseDate(a.opened).getTime() - parseDate(b.opened).getTime()}/>
            <TableHeader currentSortOrder={sortOrder} label="Дата изменения" onSort={handleClick} sortFunction={(a, b) => parseDate(a.modified).getTime() - parseDate(b.modified).getTime()}/>
            <TableHeader currentSortOrder={sortOrder} label="Крайний срок" onSort={handleClick} sortFunction={(a, b) => parseDate(a.deadline).getTime() - parseDate(b.deadline).getTime()}/>
            <th>Состояние</th>
          </tr>
        </thead>
        <tbody>
            {tickets.map(ticket => <tr key={ticket.id}>
                <td>{ticket.label}</td>
                <td>{ticket.id}</td>
                <td>{ticket.opened}</td>
                <td>{ticket.modified}</td>
                <td>{ticket.deadline}</td>
                <td>{ticket.status}</td>
            </tr>)}
        </tbody>
    </table>
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
    <th onClick={() => handleClick()}>{currentSortOrder === label ? 
        isAscending? <>{label} <GoTriangleUp/></> :
        <>{label} <GoTriangleDown/></> :
      `${label} `}</th>
  )
}

export default Table;
