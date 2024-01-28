import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import TaskForm from './TaskForm';
import { useAppDispatch } from '@/lib/hooks';
import { editTask } from '@/lib/features/tasks/tasksSlice';
import { useState } from 'react';

export type Task = {
  id?: number | any;
  title: string;
  description: string;
  date: any;
  status?: 'pending' | 'completed';
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className='font-medium capitalize'>{row.getValue('title')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className='font-medium capitalize'>
        {row.getValue('description')}
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Due Date',
    cell: ({ row }) => {
      return <div>{format(row.getValue('date'), 'PPPP')}</div>;
    },
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('status')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dispatch = useAppDispatch();
      const task = row.original
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = useState(false);
      
      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <DotsHorizontalIcon className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>
                <DialogTrigger onClick={() => dispatch(editTask(task.id))}>
                  <p className='w-28 text-start'>Edit</p>
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Toggle Status</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Edit the task below</DialogDescription>
            </DialogHeader>
            <TaskForm edit={true} setIsOpen={setIsOpen} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
