import Table from '@/components/Table/Table';
import { promises as fs } from 'fs';
import { Ticket } from "@/types";
import { parseDate } from '@/helpers';


type DashboardProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function RequestsTable({searchParams} : DashboardProps) {

  const orderBy = searchParams['orderBy'] ?? 'none'
  const isAscending = searchParams['isAscending'] ?? 'none'
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);  
  
  const prepareData = (tickets: Ticket[]) => {
    let newTickets = [...tickets]
    switch(orderBy) {
      case 'none': {
        newTickets = tickets.slice(2)
        break
      }
      case 'Тема': {
        console.log(searchParams)
        newTickets = tickets.toSorted((a, b) => a.label.localeCompare(b.label))
        console.log(newTickets[0])
        break
      }
      case 'Номер': {
        newTickets = tickets.toSorted((a, b) => parseInt(a.id) - parseInt(b.id))
        console.log(newTickets[0])
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
    if (isAscending === 'false') {
      newTickets.reverse()
    }
    return newTickets
  }

  return (
    <>
      <Table tickets={prepareData(data.tickets.gavrilov)}/>
    </>
  );
};

