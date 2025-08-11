export type TaskStatus  = 'todo' | 'in-progress' | 'done';

export interface ITask {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
  description?: string;
}
