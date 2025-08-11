import s from './TaskItem.module.css';
import { type ITask, type TaskStatus, taskStatuses } from "../model";
import deleteIcon from "assets/icons/bin-svgrepo-com.svg";

const ProgressCircle = ({status}: { status: TaskStatus }) => {

  const getProgressColor = () => {
    if (status === 'in-progress') return '#1c49ff';
    if (status === 'todo') return '#ffca1c';
    return '#61ed34';
  }

  return (
    <div
      style={{
        background: getProgressColor(),
        width: '15px',
        height: '15px',
        borderRadius: '50%'
      }}/>

  )
};


interface IProps {
  task: ITask;
  onStatusChange: (taskId: string, status: TaskStatus) => void
  onDelete: (taskId: string) => void

}

export const TaskItem = ({task, onStatusChange, onDelete}: IProps) => {
  return (
    <div className={s.taskItem}>
      <div className={s.leftArea}>
        <p className={s.title}>{task.title}</p>
        <p className={s.description}>{task.description}</p>
        <ProgressCircle status={task.status}/>
      </div>
      <div className={s.rightArea}>
        <img className={s.icon} src={deleteIcon} alt="delete" onClick={() => onDelete(task.id)}/>
        <p className={s.createdAt}>
          Created at: {Intl.DateTimeFormat('EU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(new Date(task.createdAt))}
        </p>
        <select
          id='status'
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className={s.statusSelect}>
          {taskStatuses.map(status => <option key={status}>{status}</option>)}
        </select>

      </div>
    </div>
  );
};