import { useMemo, useReducer, useState } from "react";
import {
  type ITask,
  TASK_STORAGE_KEY,
  TaskActionTypes,
  taskInitialState,
  taskReducer,
  type TaskStatus
} from "../model";
import { loadFromLocalStorage, useLocalStorageSync } from "shared";


export type TaskSortedKey = keyof Omit<ITask, 'id'>;


interface ITaskSortOption {
  label: string,
  value: TaskSortedKey
}

export const taskSortOptions: ITaskSortOption[] = [
  {label: 'Date', value: 'createdAt'},
  {label: 'Description', value: 'description'},
  {label: 'Status', value: 'status'},
]

interface IProps {
  activeGroupId?: string | null
  taskFilterValue?: string
}

export const useTasks = ({activeGroupId, taskFilterValue}: IProps) => {
  const [taskState, dispatchTask] = useReducer(taskReducer, taskInitialState, () => loadFromLocalStorage(TASK_STORAGE_KEY, taskInitialState));
  const [taskSort, setTaskSort] = useState<ITaskSortOption>({label: 'Date', value: 'createdAt'});


  const taskList = useMemo<ITask[]>(() => {
    const tasks = taskState[activeGroupId ?? ''] ?? [];
    if (taskSort.value === 'createdAt') {
      return tasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
    if (taskSort.value === 'status') {
      return tasks.sort((a, b) => b.status.localeCompare(a.status));
    }
    if (taskSort.value === 'description') {
      return tasks.sort((a, b) => a.description && b.description ? a.description.localeCompare(b.description) : 0);
    }
    return tasks.sort((a, b) => a.title.localeCompare(b.title));

  }, [activeGroupId, taskSort, taskState]);


  const filteredTaskList = useMemo(() => {
    if (!taskFilterValue || taskFilterValue?.trim() === '') return taskList;
    return taskList.filter(task => task.title.toLowerCase().includes(taskFilterValue.toLowerCase()));
  }, [taskFilterValue, taskList]);


  const addNewTask = (title: string, description: string) => {
    if (!activeGroupId) return;
    dispatchTask({
      type: TaskActionTypes.ADD_TASK,
      payload: {
        groupId: activeGroupId,
        task: {
          id: crypto.randomUUID(),
          title,
          description,
          status: 'todo',
          createdAt: new Date().toISOString()
        }
      },
    });
  };

  const deleteTask = (taskId: string) => {
    dispatchTask({type: TaskActionTypes.DELETE_TASK, payload: {groupId: activeGroupId ?? '', taskId}});
  };
  const updateTaskTitle = (taskId: string, title: string) => {
    dispatchTask({type: TaskActionTypes.UPDATE_TASK_TITLE, payload: {groupId: activeGroupId ?? '', taskId, title}});
  };
  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    dispatchTask({type: TaskActionTypes.UPDATE_TASK_STATUS, payload: {groupId: activeGroupId ?? '', taskId, status}});
  };


  useLocalStorageSync(TASK_STORAGE_KEY, taskState);

  return {
    taskList: filteredTaskList,
    addNewTask,
    deleteTask,
    updateTaskTitle,
    updateTaskStatus,

    taskSort,
    setTaskSort,
  };
};
