import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import TaskForm from './TaskForm';

export default function FormDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>Create New</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>Create a new Task</DialogDescription>
        </DialogHeader>
        <TaskForm />
      </DialogContent>
    </Dialog>
  );
}
