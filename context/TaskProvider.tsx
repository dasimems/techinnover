import { initialValue, reducer } from "@/reducer/taskReducer";
import { saveTaskToLocalStorage } from "@/services";
import {
  SET_CLICKED_TASK_CLASS,
  SET_SELECTED_TASK,
  SET_TASK,
  SET_TASK_ERROR
} from "@/utils/enums";
import { TaskStatusType, TaskType } from "@/utils/types";
import { createContext, useCallback, useContext, useReducer } from "react";
import { toast } from "react-toastify";

const TaskContext = createContext({
  ...initialValue,
  setTasks: (payload: TaskType[]) => {},
  setSelectedTask: (payload?: TaskType) => {},
  setClickedTaskClass: (payload?: TaskStatusType) => {},
  setTaskFetchingError: (payload?: string) => {}
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const setTasks = useCallback((payload: TaskType[]) => {
    try {
      saveTaskToLocalStorage(JSON.stringify(payload));
      dispatch({
        type: SET_TASK,
        payload
      });
    } catch (error) {
      console.error(error);
      toast.error("Error encountered whilst saving task");
    }
  }, []);
  const setSelectedTask = useCallback((payload?: TaskType) => {
    dispatch({
      type: SET_SELECTED_TASK,
      payload
    });
  }, []);

  const setClickedTaskClass = useCallback((payload?: TaskStatusType) => {
    dispatch({
      type: SET_CLICKED_TASK_CLASS,
      payload
    });
  }, []);

  const setTaskFetchingError = useCallback((payload?: string) => {
    dispatch({
      type: SET_TASK_ERROR,
      payload
    });
  }, []);

  console.log("new Task", state.tasks);

  return (
    <TaskContext.Provider
      value={{
        ...state,
        setClickedTaskClass,
        setTasks,
        setTaskFetchingError,
        setSelectedTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
