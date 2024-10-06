import { promises as fs } from 'fs';
import { Ticket } from '@/types';
import TicketCard from '@/components/TicketCard/TicketCard';


export default async function TicketDetails(props: {params: {user: string, id: string}}) {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);
  return (
    <TicketCard ticket={data.tickets[props.params.user].find((ticket: Ticket) => ticket.id === props.params.id)}/>
  );
};
