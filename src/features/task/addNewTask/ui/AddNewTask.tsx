import s from './AddNewTask.module.css';
import { DoneOrCancel } from "shared";
import { type KeyboardEvent, useEffect, useRef } from "react";

interface IProps {
  onAddClick: (title: string, description: string) => void
  onCancelClick: () => void
}

export const AddNewTask = ({onAddClick, onCancelClick}: IProps) => {
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddClick = () => {
    if (!titleInputRef.current || !descriptionInputRef.current) return;
    const title = titleInputRef.current.value;
    const description = descriptionInputRef.current.value;

    onAddClick(title, description);
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddClick();
  };

  useEffect(() => {
    if (!titleInputRef.current) return;
    titleInputRef.current.focus();
  }, [])

  return (
    <div className={s.addTaskContainer}>
      <label className={s.label}>Task title:</label>
      <div className={s.inputContainer}>
        <input ref={titleInputRef} type="text" className={s.input} onKeyDown={onKeyDown}/>
      </div>
      <label className={s.label}>Task Description:</label>
      <div className={s.inputContainer}>
        <input ref={descriptionInputRef} type="text" className={s.input} onKeyDown={onKeyDown}/>
      </div>

      <DoneOrCancel onCancelClick={onCancelClick} onAddClick={handleAddClick}/>

    </div>
  );
};