import type { ITask, TaskStatus } from "./types";

export const taskStatuses: TaskStatus[] = ['in-progress', 'done', 'todo'];

export const TASK_STORAGE_KEY = 'TASK_STORAGE_KEY';

export enum TaskActionTypes {
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS',
  UPDATE_TASK_TITLE = 'UPDATE_TASK_TITLE',
  DELETE_TASK = 'DELETE_TASK',
}


interface AddTaskAction {
  type: TaskActionTypes.ADD_TASK;
  payload: { groupId: string; task: ITask };
}

interface UpdateTaskStatusAction {
  type: TaskActionTypes.UPDATE_TASK_STATUS;
  payload: { groupId: string; taskId: string; status: TaskStatus };
}

interface UpdateTaskTitleAction {
  type: TaskActionTypes.UPDATE_TASK_TITLE;
  payload: { groupId: string; taskId: string; title: string };
}

interface DeleteTaskAction {
  type: TaskActionTypes.DELETE_TASK;
  payload: { groupId: string; taskId: string };
}

export type TaskAction = AddTaskAction | UpdateTaskStatusAction | DeleteTaskAction | UpdateTaskTitleAction;


export type ITaskState = Record<string, ITask[]>;
export const taskInitialState: ITaskState = {};

export function taskReducer(state: ITaskState, action: TaskAction): ITaskState {
  switch (action.type) {
    case TaskActionTypes.ADD_TASK: {
      const {groupId, task} = action.payload;
      const groupTasks = state[groupId] ?? [];
      return {
        ...state,
        [groupId]: [...groupTasks, task], // создаём новый массив, добавляя задачу
      };
    }

    case TaskActionTypes.UPDATE_TASK_STATUS: {
      const {groupId, taskId, status} = action.payload;
      const groupTasks = state[groupId] ?? [];
      return {
        ...state,
        [groupId]: groupTasks.map((t: ITask) => t.id === taskId ? {...t, status} : t),
      };
    }
    case TaskActionTypes.UPDATE_TASK_TITLE: {
      const {groupId, taskId, title} = action.payload;
      const groupTasks = state[groupId] ?? [];
      return {
        ...state,
        [groupId]: groupTasks.map((t: ITask) => t.id === taskId ? {...t, title} : t),
      };
    }

    case TaskActionTypes.DELETE_TASK: {
      const {groupId, taskId} = action.payload;
      const groupTasks = state[groupId] ?? [];
      return {
        ...state,
        [groupId]: groupTasks.filter((t: ITask) => t.id !== taskId),
      };
    }

    default:
      return state;
  }
}

