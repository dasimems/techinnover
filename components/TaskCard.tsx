import { TaskType } from "@/utils/types";
import Image from "next/image";
import React, { useState } from "react";
import { HiFlag } from "react-icons/hi";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { formatDate, formatTime } from "../utils/functions";
import { DragPreviewImage, useDrag } from "react-dnd";
import { useTaskContext } from "@/context/TaskProvider";
import useTasks from "@/hooks/useTasks";
import { allTaskStatus } from "@/utils/variables";

const DragPreview: React.FC<TaskType> = (data) => {
  const { cover, name, description, priority, deadlineDate, status, id } =
    data || {};
  let priorityClassName = "bg-red-100 text-red-600",
    flagClassName = "text-slate-400";

  const todayUTCMilliSecondsTime = new Date().getTime(),
    deadlineUTCMilliSecondsTime = deadlineDate
      ? new Date(deadlineDate).getTime()
      : null;

  switch (priority) {
    case "HIGH":
      priorityClassName = "bg-green-100 text-green-600";
      break;
    case "MEDIUM":
      priorityClassName = "bg-blue-100 text-blue-600";
      break;
    case "LOW":
      priorityClassName = "bg-red-100 text-red-600";
      break;
  }

  if (status === "COMPLETED") {
    flagClassName = "text-green-600";
  }

  if (
    status !== "COMPLETED" &&
    deadlineUTCMilliSecondsTime &&
    todayUTCMilliSecondsTime > deadlineUTCMilliSecondsTime
  ) {
    flagClassName = "text-red-600";
  }

  return (
    <div className={`flex flex-col gap-4 rounded-md p-5 bg-white`}>
      <div className={`flex flex-col gap-4`}>
        <div className="">
          <span
            className={`${priorityClassName} py-1 text-xs px-2 uppercase rounded-md font-medium`}
          >
            {priority}
          </span>
        </div>
        <div className="flex items-center gap-10 justify-between relative">
          <h1 className="font-medium text-[clamp(1rem,5vw,1.2rem)]">{name}</h1>

          <button
            onClick={() => {}}
            arial-label="Options"
            title="Options"
            className="border p-2 text-sm rounded-md"
          >
            <HiOutlineEllipsisHorizontal />
          </button>
        </div>
        {(cover || description) && (
          <div className="flex flex-col gap-4">
            {cover && (
              <div className="w-full h-32 rounded-md overflow-hidden relative">
                <Image
                  src={cover?.path}
                  alt={name}
                  fill
                  className="object-cover object-center"
                />
              </div>
            )}
            {description && <p className="opacity-60">{description}</p>}
          </div>
        )}
        <div className="flex items-center gap-10 justify-between">
          <div className="flex items-center gap-3">
            <span className={flagClassName}>
              <HiFlag />
            </span>
            <span className="opacity-60">
              {formatDate(deadlineDate ?? undefined)}
            </span>
          </div>

          <p className="opacity-60">{formatTime(deadlineDate ?? undefined)}</p>
        </div>
      </div>
    </div>
  );
};

const TaskCard: React.FC<TaskType & { index: number }> = (data) => {
  const {
    cover,
    name,
    description,
    priority,
    deadlineDate,
    status,
    index,
    id
  } = data || {};
  let priorityClassName = "bg-red-100 text-red-600",
    flagClassName = "text-slate-400";
  const { setSelectedTask } = useTaskContext();
  const { deleteTask, editTask } = useTasks();
  const [showOption, setShowOption] = useState(false);
  const [showMoveOption, setShowMoveOption] = useState(false);
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: "TaskCard",
      item: { ...data, index },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }),
    [data]
  );

  const todayUTCMilliSecondsTime = new Date().getTime(),
    deadlineUTCMilliSecondsTime = deadlineDate
      ? new Date(deadlineDate).getTime()
      : null;

  switch (priority) {
    case "HIGH":
      priorityClassName = "bg-green-100 text-green-600";
      break;
    case "MEDIUM":
      priorityClassName = "bg-blue-100 text-blue-600";
      break;
    case "LOW":
      priorityClassName = "bg-red-100 text-red-600";
      break;
  }

  if (status === "COMPLETED") {
    flagClassName = "text-green-600";
  }

  if (
    status !== "COMPLETED" &&
    deadlineUTCMilliSecondsTime &&
    todayUTCMilliSecondsTime > deadlineUTCMilliSecondsTime
  ) {
    flagClassName = "text-red-600";
  }

  const optionButton = (isMobile?: boolean) => (
    <>
      <button
        onClick={() => {
          setShowOption((prevState) => !prevState);
          setShowMoveOption(false);
        }}
        arial-label="Options"
        title="Options"
        className="border p-2 text-sm rounded-md"
      >
        <HiOutlineEllipsisHorizontal />
      </button>

      {showOption && !showMoveOption && (
        <div className="absolute border shadow-md right-0 top-[120%] bg-white rounded-md z-[100] flex flex-col">
          <button
            onClick={() => {
              setSelectedTask(data);
              setShowOption(false);
            }}
            className="cursor-pointer py-2 w-24 px-5 inline-flex justify-between items-center hover:bg-slate-100"
          >
            Edit
          </button>
          {isMobile && (
            <button
              onClick={() => {
                setShowOption(false);
                setShowMoveOption(true);
              }}
              className="cursor-pointer py-2 w-24 px-5 inline-flex justify-between items-center hover:bg-slate-100"
            >
              Move
            </button>
          )}
          <button
            onClick={() => {
              deleteTask(id);
              setShowOption(false);
            }}
            className="cursor-pointer py-2 w-24 px-5 inline-flex justify-between items-center text-red-600 hover:bg-slate-100"
          >
            Delete
          </button>
        </div>
      )}

      {!showOption && showMoveOption && (
        <div className="absolute border shadow-md right-0 top-[120%] bg-white rounded-md z-[100] flex flex-col">
          {allTaskStatus.map(({ label, value }) => (
            <button
              key={value}
              disabled={data.status === value}
              onClick={() => {
                editTask({ ...data, status: value });
                setShowOption(false);
                setShowMoveOption(false);
              }}
              className="cursor-pointer disabled:opacity-60 disabled:bg-slate-100 py-3 w-36 px-5 inline-flex justify-between items-center hover:bg-slate-100 text-left"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
  return (
    <>
      <div
        ref={(ref) => {
          if (ref) {
            drag(ref);
          }
        }}
        className={`flex flex-col gap-4 rounded-md p-5  ${
          isDragging
            ? "bg-primary/10 border-dashed border border-primary"
            : "bg-white"
        }`}
      >
        <div
          className={`flex flex-col gap-4 ${
            isDragging ? "cursor-grabbing opacity-0" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-10 relative">
            <span
              className={`${priorityClassName} py-1 text-xs px-2 uppercase rounded-md font-medium`}
            >
              {priority}
            </span>

            <div className="block sm:hidden">{optionButton(true)}</div>
          </div>
          <div className="flex items-center gap-10 justify-between relative">
            <h1 className="font-medium text-[clamp(1rem,5vw,1.2rem)]">
              {name}
            </h1>

            <div className="hidden sm:block">{optionButton()}</div>
          </div>
          {(cover || description) && (
            <div className="flex flex-col gap-4">
              {cover && (
                <div className="w-full h-32 rounded-md overflow-hidden relative">
                  <Image
                    src={cover?.path}
                    alt={name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              )}
              {description && <p className="opacity-60">{description}</p>}
            </div>
          )}
          <div className="flex flex-wr items-center gap-10 justify-between">
            <div className="flex items-center gap-3">
              <span className={flagClassName}>
                <HiFlag />
              </span>
              <span className="opacity-60">
                {formatDate(deadlineDate ?? undefined)}
              </span>
            </div>

            <p className="opacity-60">
              {formatTime(deadlineDate ?? undefined)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
