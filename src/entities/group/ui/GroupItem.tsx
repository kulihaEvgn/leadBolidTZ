import s from './GroupItem.module.css';
import editIcon from 'assets/icons/edit-svgrepo-com.svg';
import deleteIcon from 'assets/icons/bin-svgrepo-com.svg';
import { type MouseEvent, useState } from "react";
import { EditableSpan } from "shared";
import type { IGroup } from "../model";


interface IProps {
  group: IGroup;
  activeGroupId?: string | null
  onGroupClick: (groupId: string) => void
  onEditGroupName: (groupId: string, name: string) => void
  onDeleteGroup: (groupId: string) => void;
}

export const GroupItem = (
  {
    group,
    activeGroupId,
    onEditGroupName,
    onGroupClick,
    onDeleteGroup,
  }: IProps) => {
  const [isEditName, setIsEditName] = useState(false);

  const handleGroupClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onGroupClick(group.id);
  };

  const onEditEnd = (isEdit: boolean, text: string) => {
    setIsEditName(isEdit);
    onEditGroupName?.(group.id, text);
  };

  const handleDelete = () => {
    onDeleteGroup?.(group.id);
  };

  const handleEdit = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsEditName(prev => !prev)
  }

  const className = `${s.groupItem} ${activeGroupId === group?.id ? s.active : ''}`;

  return (
    <div className={className} onClick={handleGroupClick}>

      <EditableSpan isEdit={isEditName} onEditEnd={onEditEnd} text={group?.name}/>
      <div className={s.controls}>
        <img className={s.icon} src={editIcon} alt="edit" onClick={handleEdit}/>
        <img className={s.icon} src={deleteIcon} alt="delete" onClick={handleDelete}/>
      </div>

    </div>
  );
};