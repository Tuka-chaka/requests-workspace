import { promises as fs } from 'fs';
import { Ticket } from "@/types";
import styles from './page.module.scss'
import { getStatusColor, parseDate } from "@/helpers";
import { FaCircle } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";
import Link from 'next/link'
import TableHeader from '@/components/TableHeader/TableHeader';
import Paginator from '@/components/Paginator/Paginator';


type DashboardProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
  params: {user: string}
}

export default async function RequestsTable({searchParams, params} : DashboardProps) {

  const orderBy = searchParams!['orderBy'] ?? 'Номер'
  const isAscending = searchParams!['isAscending'] ?? 'false'
  const page = parseInt(searchParams!['page'] as string ?? '0')
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);  
  
  const prepareData = (tickets: Ticket[]) => {
    let newTickets = [...tickets]
    switch(orderBy) {
      case 'Тема': {
        newTickets = tickets.toSorted((a, b) => a.label.localeCompare(b.label))
        break
      }
      case 'Номер': {
        newTickets = tickets.toSorted((a, b) => parseInt(a.id) - parseInt(b.id))
        break
      }
      case 'Дата создания': {
        newTickets = tickets.toSorted((a, b) => parseDate(a.opened).getTime() - parseDate(b.opened).getTime())
        break
      }
      case 'Дата изменения': {
        newTickets = tickets.toSorted((a, b) => parseDate(a.modified).getTime() - parseDate(b.modified).getTime())
        break
      }
      case 'Крайний срок': {
        newTickets = tickets.toSorted((a, b) => parseDate(a.deadline).getTime() - parseDate(b.deadline).getTime())
        break
      }
      case 'Состояние': {
        newTickets = tickets.toSorted((a, b) => a.status.localeCompare(b.status))
        break
      }
    }
    if (isAscending !== 'false') {
      newTickets.reverse()
    }
    return newTickets.slice(page*4, page*4 + 4)
  }

  if (data.tickets[params.user].length < 1) {
    return(
      <div className={styles.noTickets}>Поданных обращений нет</div>
    )
  }

  return (
    <>
    <div className={styles.tableContainer}>
    <table className={styles.table}>
        <thead>
          <tr className={styles.tableHead}>
            <TableHeader user={params.user} label="Тема"/>
            <TableHeader user={params.user} label="Номер"/>
            <TableHeader user={params.user} label="Дата создания"/>
            <TableHeader user={params.user} label="Дата изменения"/>
            <TableHeader user={params.user} label="Крайний срок"/>
            <TableHeader user={params.user} label="Состояние"/>
          </tr>
        </thead>
        <tbody>
            {prepareData(data.tickets[params.user]).map(ticket => <tr className={styles.tableRow} key={ticket.id}>
                <td><div className={styles.withIcon}><Link className={styles.link} href={`/${params.user}/${ticket.id}`} >{ticket.label}</Link>
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
    <Paginator user={params.user} pages={Math.floor(data.tickets[params.user].length / 4)}/>
    </>
  );
};

