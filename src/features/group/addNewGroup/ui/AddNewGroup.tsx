import s from './AddNewGroup.module.css';
import { type KeyboardEvent, useEffect, useRef } from "react";
import { DoneOrCancel } from "shared";

interface IProps {
  addNewGroup: (groupName: string) => void
  onCancelClick: () => void
}


export const AddNewGroup = ({addNewGroup, onCancelClick}: IProps) => {

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onAddClick = () => {
    if (!inputRef.current) return;
    const groupName = inputRef.current.value;
    if (!groupName) return;

    addNewGroup(groupName);

    inputRef.current.value = '';
    onCancelClick();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onAddClick();
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, [])

  return (
    <div className={s.container}>
      <div className={s.inputContainer}>
        <input onKeyDown={onKeyDown} ref={inputRef} className={s.input} type="text" placeholder="Название группы"/>
      </div>
      <DoneOrCancel onCancelClick={onCancelClick} onAddClick={onAddClick}/>
    </div>
  );
};