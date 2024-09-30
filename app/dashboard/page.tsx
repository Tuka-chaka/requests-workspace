import Table from '@/components/Table/Table';
import { promises as fs } from 'fs';

export default async function RequestsTable() {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);

  return (
    <div>
      <Table tickets={data.tickets.gavrilov}/>
    </div>
  );
};

