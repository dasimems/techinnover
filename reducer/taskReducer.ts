import {
  SET_CLICKED_TASK_CLASS,
  SET_SELECTED_TASK,
  SET_TASK,
  SET_TASK_ERROR,
  TaskActionType
} from "@/utils/enums";
import { TaskStatusType, TaskType } from "@/utils/types";

export interface InitialValueType {
  tasks: null | TaskType[];
  selectedTask: null | TaskType;
  taskFetchError: string | null;
  clickedTaskClass: TaskStatusType | null;
}
export const initialValue: InitialValueType = {
  tasks: null,
  selectedTask: null,
  taskFetchError: null,
  clickedTaskClass: null
};

export const reducer = (
  state: InitialValueType,
  action: { type: TaskActionType; payload?: any }
): InitialValueType => {
  const { type, payload } = action || {};

  switch (type) {
    case SET_TASK:
      return { ...state, tasks: payload };
    case SET_TASK_ERROR:
      return { ...state, taskFetchError: payload || null };
    case SET_CLICKED_TASK_CLASS:
      return { ...state, clickedTaskClass: payload || null };
    case SET_SELECTED_TASK:
      return { ...state, selectedTask: payload || null };
    default:
      return state;
  }
};
