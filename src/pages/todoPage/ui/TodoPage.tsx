import { useState } from "react";
import { taskSortOptions, useGroup, useTasks } from "entities";
import { useDebounceValue, FilterAndSort } from "shared";
import { GroupList } from "./groupList/GroupList";
import { TaskList } from "./taskList/TaskList.tsx";
import s from './TodoPage.module.css';


export const TodoPage = () => {

  const [taskFilterValue, setTaskFilterValue] = useState('');
  const debouncedFilterValue = useDebounceValue(taskFilterValue);

  const {
    activeGroupId,
    updateGroupName,
    addGroup,
    groupList,
    deleteGroup,
    setActiveGroup
  } = useGroup();

  const {
    addNewTask,
    taskList,
    deleteTask,
    updateTaskStatus,
    setTaskSort,
    taskSort,
  } = useTasks({ activeGroupId, taskFilterValue: debouncedFilterValue });


  return (
    <main className={s.container}>
      <h1 className={s.mainTitle}>Todo App</h1>
      <section className={s.content}>

        <div className={s.leftArea}>
          <GroupList
            addNewGroup={addGroup}
            deleteGroup={deleteGroup}
            setActiveGroup={setActiveGroup}
            groupList={groupList}
            updateGroupName={updateGroupName}
            activeGroupId={activeGroupId}
          />
        </div>

        <div className={s.rightArea}>
          <TaskList
            taskList={taskList}
            addNewTask={addNewTask}
            activeGroupId={activeGroupId}
            deleteTask={deleteTask}
            changeTaskStatus={updateTaskStatus}
            headerRightSlot={
              <FilterAndSort
                selectOptions={taskSortOptions}
                selectValue={taskSort}
                onChangeSelect={setTaskSort}
                inputValue={taskFilterValue}
                onChangeInput={setTaskFilterValue}
              />}
          />
        </div>

      </section>


    </main>
  );
};