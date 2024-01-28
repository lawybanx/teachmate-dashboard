'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';

import { addTask, updateTask } from '@/lib/features/tasks/tasksSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Dispatch, SetStateAction, useEffect } from 'react';

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be longer than 2 characters.',
    })
    .max(30, {
      message: 'Title must not be longer than 30 characters.',
    }),
  date: z.date({
    required_error: 'Due date is required.',
  }),
  description: z.string({
    required_error: 'Please provide a description for the task.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

type TaskFormProps = {
  setIsOpen?: Dispatch<SetStateAction<boolean>> | any;
  edit?: boolean;
};

export default function TaskForm({ setIsOpen, edit }: TaskFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const dispatch = useAppDispatch();
  const currentTask = useAppSelector(state => state.taskReducer.currentTask);

  useEffect(() => {
    if (edit && currentTask) {
      // If in edit mode and there's a current task, set initial values
      form.reset({
        title: currentTask.title,
        date: currentTask.date,
        description: currentTask.description,
      });
    }
  }, [edit, currentTask, form.reset]);

  function onSubmit(data: FormValues) {
    if (edit && currentTask) {
      dispatch(updateTask({ ...currentTask, ...data }));
      toast.success('Task has been updated');
    } else {
      dispatch(addTask(data));
      toast.success('A new task has been created');
    }

    setIsOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Title' {...field} />
              </FormControl>
              <FormDescription>This is the name of the task.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Due Date</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={date =>
                      date < new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>The due date for the task.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='What is this about?'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Give a description about the task.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>{edit ? 'Edit' : 'Create'}</Button>
      </form>
    </Form>
  );
}
