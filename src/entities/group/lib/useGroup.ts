import { useReducer } from "react";

import { loadFromLocalStorage, useLocalStorageSync } from "shared";
import { GROUP_STORAGE_KEY, GroupActionTypes, groupInitialState, groupReducer } from "../model/groupReducer";

export const useGroup = () => {
  const [state, dispatch] = useReducer(groupReducer, groupInitialState, () => loadFromLocalStorage(GROUP_STORAGE_KEY, groupInitialState));

  const groupList = state.groups;
  const activeGroupId = state.activeGroupId && state.groups.find((g) => g.id === state.activeGroupId) ? state.activeGroupId : null;

  const addGroup = (groupName: string) => {
    dispatch({ type: GroupActionTypes.ADD_GROUP, payload: {id: crypto.randomUUID(), name: groupName} });
  };

  const deleteGroup = (groupId: string) => {
    dispatch({type: GroupActionTypes.DELETE_GROUP, payload: {groupId}});
  };

  const setActiveGroup = (groupId: string) => {
    dispatch({type: GroupActionTypes.SET_ACTIVE_GROUP, payload: {groupId}});
  };

  const updateGroupName = (groupId: string, name: string) => {
    dispatch({type: GroupActionTypes.EDIT_GROUP_NAME, payload: { groupId, name }});
  };

  useLocalStorageSync(GROUP_STORAGE_KEY, state);

  return {
    groupList,
    activeGroupId,
    addGroup,
    deleteGroup,
    setActiveGroup,
    updateGroupName,
  };
};
