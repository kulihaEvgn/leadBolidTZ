import type { IGroup } from "./types";

export const GROUP_STORAGE_KEY = 'GROUP_STORAGE_KEY';


export enum GroupActionTypes {
  ADD_GROUP = 'ADD_GROUP',
  DELETE_GROUP = 'DELETE_GROUP',
  SET_ACTIVE_GROUP = 'SET_ACTIVE_GROUP',
  EDIT_GROUP_NAME = 'EDIT_GROUP_NAME',
}

interface AddGroupAction {
  type: GroupActionTypes.ADD_GROUP;
  payload: IGroup;
}

interface DeleteGroupAction {
  type: GroupActionTypes.DELETE_GROUP;
  payload: { groupId: string };
}

interface SetActiveGroupAction {
  type: GroupActionTypes.SET_ACTIVE_GROUP;
  payload: { groupId: string };
}

interface EditGroupNameAction {
  type: GroupActionTypes.EDIT_GROUP_NAME;
  payload: { groupId: string, name: string };
}

export type GroupAction = AddGroupAction | DeleteGroupAction | SetActiveGroupAction | EditGroupNameAction

export interface IGroupState {
  activeGroupId: string | null
  groups: IGroup[]
}

export const groupInitialState: IGroupState = {groups: [], activeGroupId: null};

export const groupReducer = (state: IGroupState, action: GroupAction): IGroupState => {
  switch (action.type) {
    case GroupActionTypes.ADD_GROUP:
      return {...state, groups: [...state.groups, action.payload]};

    case GroupActionTypes.DELETE_GROUP:
      return {...state, groups: state.groups.filter((g: IGroup) => g.id !== action.payload.groupId)};

    case GroupActionTypes.SET_ACTIVE_GROUP:
      return {...state, activeGroupId: action.payload.groupId};

    case GroupActionTypes.EDIT_GROUP_NAME: {
      return {
        ...state,
        groups: state.groups.map((g: IGroup) => g.id === action.payload.groupId ? {...g, name: action.payload.name} : g)
      };
    }

    default:
      return state;
  }
}
