import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

type Task = {
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'completed';
};

export const data: Task[] = [
  {
    title: 'First',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at quam.',
    status: 'pending',
    date: '2024-01-26T00:00:00.000Z',
  },
  {
    title: 'Second',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at quam.',
    status: 'completed',
    date: '2024-01-26T00:00:00.000Z',
  },
  {
    title: 'Third',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at quam.',
    status: 'pending',
    date: '2024-01-26T00:00:00.000Z',
  },
  {
    title: 'Fourth',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at quam.',
    status: 'completed',
    date: '2024-01-26T00:00:00.000Z',
  },
  {
    title: 'Fifth',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at quam.',
    status: 'pending',
    date: '2024-01-26T00:00:00.000Z',
  },
];

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className='font-medium capitalize'>{row.getValue('title')}</div>
    ),
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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Mark Complete</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
