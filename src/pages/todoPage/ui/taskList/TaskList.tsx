import s from './TaskList.module.css';
import { type ITask, TaskItem, type TaskStatus } from "entities";
import { AddNewTask } from "features";
import { type ReactNode, useState } from "react";

interface IProps {
  taskList: ITask[]
  addNewTask: (title: string, description: string) => void
  deleteTask: (taskId: string) => void
  changeTaskStatus: (taskId: string, status: TaskStatus) => void

  activeGroupId?: string | null

  headerRightSlot?: ReactNode;
}

export const TaskList = (
  {
    taskList,
    addNewTask,
    activeGroupId,
    deleteTask,
    changeTaskStatus,
    headerRightSlot
  }: IProps) => {
  const [isAddNewTask, setIsAddNewTask] = useState(false);


  const handleAddNewTask = (title: string, description: string) => {
    addNewTask(title, description);
    setIsAddNewTask(false);
  };


  return (
    <div className={s.taskListContainer}>
      <div className={s.header}>
        <h2 className={s.title}>Tasks</h2>
        {headerRightSlot}
      </div>

      <div className={s.list}>
        {!taskList || !taskList.length &&
          <div>
            <p style={{textAlign: 'center'}}>There are no tasks</p>
            {!activeGroupId && <p style={{textAlign: 'center'}}>Please select some group and add some tasks</p>}
          </div>

        }
        {taskList && taskList.length > 0 && taskList.map((task: ITask) => (
          <TaskItem key={task.id} task={task} onStatusChange={changeTaskStatus} onDelete={deleteTask}/>
        ))}
        {isAddNewTask && <AddNewTask onAddClick={handleAddNewTask} onCancelClick={() => setIsAddNewTask(false)}/>}

      </div>
      {activeGroupId && <button onClick={() => setIsAddNewTask(true)}>Add new task</button>}

    </div>
  );
};