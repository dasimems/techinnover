import { useTaskContext } from "@/context/TaskProvider";
import { TaskClassType, TaskType } from "@/utils/types";
import React, { useCallback, useEffect, useState } from "react";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import useTasks from "@/hooks/useTasks";

const TaskContainer: React.FC<TaskClassType> = ({ label, value }) => {
  const { tasks, setClickedTaskClass } = useTaskContext();
  const { editTask } = useTasks();

  const moveItem = useCallback(
    (draggedItem: TaskType & { index: number }) => {
      const { index, ...item } = draggedItem;

      console.log(tasks);
      if (draggedItem.status === value) return;
      editTask({ ...item, status: value });
    },
    [editTask, value, tasks]
  );
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "TaskCard",
      drop: (item: TaskType & { index: number }) => moveItem(item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    }),
    [moveItem]
  );

  const isActive = canDrop && isOver;
  const [filteredTask, setFilteredTask] = useState<TaskType[] | null>(null);

  const openAddTaskModal = useCallback(() => {
    setClickedTaskClass(value);
  }, [value, setClickedTaskClass]);

  useEffect(() => {
    if (tasks) {
      setFilteredTask(tasks.filter((task) => task.status === value));
    }

    return () => {
      setFilteredTask(null);
    };
  }, [tasks, value]);
  return (
    <div
      ref={(ref) => {
        if (ref) {
          drop(ref);
        }
      }}
      className={`p-5 rounded-md border-4 small-tablet:border-none border-white ${
        isActive ? "bg-primary/20" : "bg-slate-100"
      } flex flex-col gap-3 sticky top-2`}
    >
      <div className="flex justify-between items-center gap-10">
        <p className="font-medium text-lg opacity-60">
          {label}{" "}
          {filteredTask && value !== "COMPLETED" && (
            <span className="py-1 px-2 bg-slate-300 rounded-md">
              {filteredTask.length}
            </span>
          )}
        </p>
        <button title="Add task" onClick={openAddTaskModal}>
          <HiOutlinePlusSmall />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {filteredTask &&
          filteredTask.length > 0 &&
          filteredTask.map((task, index) => (
            <TaskCard index={index} {...task} key={task.id} />
          ))}

        {!tasks && (
          <div className="py-10">
            <p className="text-center opacity-60">Fetching Tasks...</p>
          </div>
        )}
        {filteredTask && filteredTask.length < 1 && (
          <div className="py-20 flex flex-col items-center text-center">
            <p className="text-center opacity-60">
              No {label} Task available at the moment
            </p>
            <p>
              Click{" "}
              <button onClick={openAddTaskModal} className="text-primary">
                here
              </button>{" "}
              to add task
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskContainer;
