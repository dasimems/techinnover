import { useTaskContext } from "@/context/TaskProvider";
import { TaskType } from "@/utils/types";
import { localStorageKey } from "@/utils/variables";
import React, { useCallback } from "react";

const useTasks = () => {
  const { tasks, setTasks, setTaskFetchingError } = useTaskContext();

  const addTask = useCallback(
    (payload: TaskType) => {
      if (!payload) {
        throw new Error("No payload sent in function addTask");
      }

      const newTasks: TaskType[] = [...(tasks || []), payload];
      setTasks(newTasks);
    },
    [tasks, setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      if (!id) {
        throw new Error('parameter "id" not sent in function deleteTask');
      }
      console.log("before delete", tasks);
      const newTasks: TaskType[] = (tasks || [])?.filter(
        (task: TaskType) => task.id !== id
      );
      setTasks(newTasks);
    },
    [setTasks, tasks]
  );

  const editTask = useCallback(
    (payload: TaskType) => {
      if (!payload) {
        throw new Error("parameter payload not sent in function editTask");
      }
      console.log("Previous Task", tasks);
      const newTasks: TaskType[] = (tasks || [])?.map((task: TaskType) =>
        task.id === payload.id ? { ...task, ...payload } : task
      );
      setTasks(newTasks);
    },
    [setTasks, tasks]
  );

  const fetchTasks = useCallback(() => {
    try {
      const tasks = localStorage.getItem(localStorageKey);
      if (tasks) {
        setTasks(JSON.parse(tasks));
      }

      if (!tasks) {
        setTasks([]);
      }
    } catch (error) {
      setTaskFetchingError("Error encountered whilst fetching task");
    }
  }, [setTasks, setTaskFetchingError]);
  return {
    editTask,
    fetchTasks,
    deleteTask,
    addTask
  };
};

export default useTasks;
