// tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/components/column';

interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
}

const initialState: TaskState = {
  tasks: [
    {
      id: 1,
      title: 'First',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at quam.',
      status: 'pending',
      date: '2024-01-26T00:00:00.000Z',
    },
    {
      id: 2,
      title: 'Second',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at quam.',
      status: 'completed',
      date: '2024-01-26T00:00:00.000Z',
    },
  ],
  currentTask: null,
};

const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      // Assign a unique ID to the new task
      const newTask: Task = {
        ...action.payload,
        id: state.tasks.length + 1,
        status: 'pending',
      };
      state.tasks.push(newTask);
    },
    editTask: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      state.currentTask = state.tasks.find(task => task.id === taskId) || null;
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        task => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        state.currentTask = null; // Clear the currentTask after updating
      }
    },
    toggleStatus: (
      state,
      action: PayloadAction<{
        taskId: number;
        newStatus: 'pending' | 'completed';
      }>
    ) => {
      const index = state.tasks.findIndex(
        task => task.id === action.payload.taskId
      );
      if (index !== -1) {
        state.tasks[index].status = action.payload.newStatus;
      }
    },
  },
});

export const { addTask, editTask, updateTask, toggleStatus } = tasks.actions;
export default tasks.reducer;
