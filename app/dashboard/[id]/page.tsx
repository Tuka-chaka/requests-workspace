import { promises as fs } from 'fs';
import { Ticket } from '@/types';


export default async function TicketDetails(props: {params: {id: string}}) {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);
  return (
    <div>
        {data.tickets.gavrilov.find((ticket: Ticket) => ticket.id === props.params.id).label}
    </div>
  );
};
