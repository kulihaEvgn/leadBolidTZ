import s from './GroupList.module.css';
import addIcon from 'assets/icons/add-svgrepo-com.svg';
import { useState } from "react";
import { GroupItem, type IGroup } from "entities";
import { AddNewGroup } from "features";

interface IProps {
  groupList: IGroup[]

  addNewGroup: (groupName: string) => void
  updateGroupName: (groupId: string, name: string) => void
  deleteGroup: (groupId: string) => void

  activeGroupId?: string | null
  setActiveGroup: (groupId: string) => void
}


export const GroupList = (
  {
    deleteGroup,
    updateGroupName,
    addNewGroup,
    setActiveGroup,
    activeGroupId,
    groupList
  }: IProps) => {
  const [isAddNewGroup, setIsAddNewGroup] = useState(false);


  const onEditGroupName = (groupId: string, name: string) => {
    updateGroupName(groupId, name);
  };

  const onDeleteGroup = (groupId: string) => {
    deleteGroup(groupId);
  };

  const onNewGroupButtonClick = () => {
    setIsAddNewGroup(true);
  };


  return (
    <div className={s.groupListContainer}>
      <h2 className={s.title}>Groups</h2>


      <div className={s.list}>
        {!groupList || groupList.length === 0 &&
          <span style={{textAlign: 'center'}}>There are no groups</span>
        }
        {groupList && groupList.length > 0 && groupList.map(g => (
          <GroupItem
            onGroupClick={setActiveGroup}
            key={g.id}
            group={g}
            activeGroupId={activeGroupId}
            onDeleteGroup={onDeleteGroup}
            onEditGroupName={onEditGroupName}
          />
        ))}
        {isAddNewGroup && <AddNewGroup addNewGroup={addNewGroup} onCancelClick={() => setIsAddNewGroup(false)}/>}
      </div>

      <button
        disabled={isAddNewGroup}
        onClick={onNewGroupButtonClick}
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10%'}}
      >
        <img style={{width: '20px'}} src={addIcon} alt="add"/>
        Add new group
      </button>

    </div>
  );
};