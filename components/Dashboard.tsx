import FormDialog from './FormDialog';
import TaskTable from './TaskTable';
import { Separator } from './ui/separator';

export default function Dashboard() {
  return (
    <>
      <h1 className='text-2xl py-3'>Welcome to the Teachmate AI Task Management Dashboard</h1>

      <div>
        <FormDialog />
        <TaskTable />
      </div>
    </>
  );
}
