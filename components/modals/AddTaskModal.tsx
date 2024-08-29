import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "../Modal";
import { useTaskContext } from "@/context/TaskProvider";
import { MdCalendarToday, MdClose } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { CoverImageType, TaskPrioritiesType, TaskType } from "@/utils/types";
import InputField from "../form/InputField";
import TextArea from "../form/TextArea";
import { LuClock3 } from "react-icons/lu";
import Button from "../Button";
import Label from "../form/Label";
import { FaAngleDown, FaRegTrashAlt } from "react-icons/fa";
import { allTaskPriorities } from "@/utils/variables";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import Image from "next/image";
import { formatDate, formatFileSize, formatTime } from "@/utils/functions";
import DatePicker from "react-datepicker";
import useTasks from "@/hooks/useTasks";

const AddTaskModal = () => {
  const {
    clickedTaskClass,
    setClickedTaskClass,
    selectedTask,
    setSelectedTask
  } = useTaskContext();
  const { addTask, editTask } = useTasks();
  const [showPriorityOption, setShowPriorityOption] = useState(false);
  const [temporaryImage, setTemporaryImage] = useState<CoverImageType | null>(
    null
  );
  const [progressPercent, setProgressPercent] = useState(0);
  const defaultValues: TaskType = useMemo(
    () => ({
      cover: null,
      createdAt: new Date(),
      deadlineDate: new Date(),
      //   deadlineTime: null,
      description: "",
      id: "",
      name: "",
      priority: "LOW",
      status: "TO_DO"
    }),
    []
  );
  const {
    register,
    formState: { isDirty, errors },
    handleSubmit,
    reset,
    control,
    setFocus
  } = useForm<TaskType>({
    defaultValues
  });

  const closeModal = useCallback(() => {
    setClickedTaskClass();
    setSelectedTask();
  }, [setClickedTaskClass, setSelectedTask]);
  const createTask = useCallback(
    (data: TaskType) => {
      if (selectedTask) {
        editTask(data);
      }

      if (!selectedTask) {
        addTask({ ...data, id: Date.now()?.toString() });
      }
      closeModal();
    },
    [addTask, closeModal, editTask, selectedTask]
  );

  const generatePriorityClassName = (
    priority: TaskPrioritiesType,
    isSelect?: boolean,
    isActive?: boolean
  ) => {
    let priorityClassName = `${
      isSelect && !isActive ? "" : "bg-red-100"
    } text-red-600`;
    switch (priority) {
      case "HIGH":
        priorityClassName = `${
          isSelect && !isActive ? "" : "bg-green-100"
        } text-green-600`;
        break;
      case "MEDIUM":
        priorityClassName = `${
          isSelect && !isActive ? "" : "bg-blue-100"
        } text-blue-600`;
        break;
      case "LOW":
        priorityClassName = `${
          isSelect && !isActive ? "" : "bg-red-100"
        } text-red-600`;
        break;
    }

    return priorityClassName;
  };

  useEffect(() => {
    if (selectedTask) {
      reset({
        cover: selectedTask?.cover,
        createdAt: selectedTask?.createdAt,
        deadlineDate: selectedTask?.deadlineDate,
        description: selectedTask?.description,
        id: selectedTask?.id,
        name: selectedTask?.name,
        priority: selectedTask?.priority,
        status: selectedTask?.status
      });
    }

    if (!selectedTask && clickedTaskClass) {
      reset({
        ...defaultValues,
        status: clickedTaskClass
      });
    }
    setFocus("name", {
      shouldSelect: true
    });
    return () => {
      reset(defaultValues);
    };
  }, [reset, setFocus, defaultValues, selectedTask, clickedTaskClass]);

  return (
    <Modal
      onClose={closeModal}
      opened={!!clickedTaskClass || !!selectedTask}
      position="center"
    >
      <div className=" bg-white flex flex-col rounded-md w-[95vw] small-tablet:w-[90vw] max-w-[517px] z-[100] relative small-tablet:max-h-[90vh] overflow-y-auto h-[95vh]">
        <div className="flex items-center gap-10 justify-between sticky top-0 z-[101] p-10  bg-white">
          <h1 className="font-bold text-xl">
            {selectedTask ? "Edit" : "Add"} Task
          </h1>

          <button onClick={closeModal} title="close" className="text-2xl">
            <MdClose />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(createTask)}
          className="flex flex-col gap-6 p-10 pt-0"
        >
          <InputField
            label="Task name"
            placeholder="Enter task name"
            {...register("name", { required: "Please provide your task name" })}
            error={errors?.name?.message}
          />
          <TextArea
            label="Description"
            placeholder="Enter task name"
            inputClassName="h-[100px]"
            optional
            {...register("description")}
            error={errors?.name?.message}
          />

          <div className="flex flex-col gap-2 relative">
            <Label>Priority</Label>
            <Controller
              control={control}
              name="priority"
              render={({
                field: { onChange, value: selectedValue, ref },
                formState: { errors }
              }) => (
                <>
                  <button
                    ref={ref}
                    onClick={() => {
                      setShowPriorityOption((prevState) => !prevState);
                    }}
                    className="border rounded-xl p-3 w-full text-left flex items-center justify-between gap-2"
                    type="button"
                    title="Select priority"
                  >
                    {selectedValue && (
                      <span
                        className={`${generatePriorityClassName(
                          selectedValue
                        )} py-2 px-3 lowercase first-letter:uppercase text-xs rounded-md`}
                      >
                        {selectedValue}
                      </span>
                    )}
                    {!selectedValue && (
                      <span>Select the priority of the task</span>
                    )}

                    <span className="opacity-60">
                      <FaAngleDown />
                    </span>
                  </button>
                  {showPriorityOption && (
                    <ul className="absolute border shadow-md right-0 top-[80%] bg-white rounded-md z-[100] flex flex-col">
                      {allTaskPriorities.map(({ label, value }) => {
                        const isActive = selectedValue === value;

                        return (
                          <li
                            onClick={() => {
                              setShowPriorityOption(false);
                              onChange(value);
                            }}
                            className={`cursor-pointer py-2 w-52 px-5 inline-flex justify-between items-center ${generatePriorityClassName(
                              value,
                              true,
                              isActive
                            )}`}
                            key={value}
                          >
                            <span>{label}</span>
                            {isActive && (
                              <span className="text-sm">
                                <IoCheckmarkOutline />
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {errors?.priority?.message && (
                    <p className="text-red-600 text-sm">
                      {errors?.priority?.message}
                    </p>
                  )}
                </>
              )}
              rules={{
                required: "Please select a priority"
              }}
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <Label optional>Upload cover</Label>

            <div className="relative">
              <Controller
                control={control}
                name="cover"
                render={({
                  field: { onChange, value: selectedValue, ref },
                  formState: { errors }
                }) => (
                  <>
                    {!selectedValue && !temporaryImage && (
                      <div className="border p-5 rounded-xl relative overflow-hidden">
                        <div className="flex flex-col gap-5 items-center text-center relative">
                          <span className="bg-slate-100 size-14 inline-flex items-center justify-center rounded-full">
                            <span className="size-[70%] text-slate-600 bg-slate-200 rounded-full inline-flex items-center justify-center">
                              <FiUploadCloud />
                            </span>
                          </span>
                          <p className="max-w-[250px]">
                            <span className="text-primary font-medium">
                              Click to upload
                            </span>{" "}
                            <span className="opacity-60">
                              or drag and drop PNG or JPG
                            </span>
                          </p>
                        </div>
                        <div className="absolute size-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 cursor-pointer opacity-0">
                          <input
                            type="file"
                            onChange={(e) => {
                              const inputElement = e.target as HTMLInputElement;

                              if (!inputElement || !inputElement.files) {
                                toast.error("No file selected");
                                inputElement.value = "";
                              }
                              if (inputElement && inputElement.files) {
                                const selectedFile = inputElement.files[0];

                                const isImage =
                                  selectedFile.type.startsWith("image/");

                                if (!isImage) {
                                  toast.error(
                                    "The selected file type is not an image"
                                  );
                                  inputElement.value = "";
                                  return;
                                }
                                const tempImageUrl =
                                  URL.createObjectURL(selectedFile);
                                setTemporaryImage({
                                  path: tempImageUrl,
                                  name: selectedFile.name,
                                  size: selectedFile.size,
                                  type: selectedFile.type
                                });
                                const reader = new FileReader();

                                reader.onprogress = (e) => {
                                  const percent = (e.loaded / e.total) * 100;
                                  setProgressPercent(percent);
                                };
                                reader.onload = () => {
                                  inputElement.value = "";
                                  setTemporaryImage(null);
                                  setProgressPercent(0);
                                  onChange({
                                    path: reader.result,
                                    name: selectedFile.name,
                                    size: selectedFile.size,
                                    type: selectedFile.type
                                  });
                                };
                                reader.readAsDataURL(selectedFile);
                              }
                            }}
                            title="Click to upload"
                            className="outline-none size-full relative"
                          />
                        </div>
                      </div>
                    )}

                    {temporaryImage && (
                      <div className="flex gap-6 items-center border border-primary p-5 rounded-xl relative overflow-hidden">
                        <div className="grid grid-cols-2 flex-1 gap-6">
                          <div className="relative overflow-hidden rounded-md">
                            <Image
                              alt={temporaryImage.name}
                              src={temporaryImage.path}
                              className="object-cover object-center"
                              fill
                            />
                          </div>

                          <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                              <h1 className="text-lg text-slate-700 font-medium">
                                {temporaryImage.name}
                              </h1>
                              <p className="opacity-60">
                                {formatFileSize(temporaryImage.size)}
                              </p>
                            </div>

                            <div className="flex items-center gap-4 w-full">
                              <div className="flex-1">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{
                                    width: `${progressPercent}%`
                                  }}
                                ></div>
                              </div>
                              <p>{progressPercent}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          title="Delete image"
                          className="text-xl opacity-60"
                          onClick={() => {
                            onChange(null);
                          }}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    )}
                    {selectedValue && (
                      <div className="flex gap-6 items-center border border-primary p-5 rounded-xl relative overflow-hidden">
                        <div className="grid grid-cols-2 flex-1 gap-6">
                          <div className="relative overflow-hidden rounded-md">
                            <Image
                              alt={selectedValue.name}
                              src={selectedValue.path}
                              className="object-cover object-center"
                              fill
                            />
                          </div>

                          <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                              <h1 className="text-lg text-slate-700 font-medium">
                                {selectedValue.name}
                              </h1>
                              <p className="opacity-60">
                                {formatFileSize(selectedValue.size)}
                              </p>
                            </div>

                            <div className="flex items-center gap-4 w-full">
                              <div className="flex-1 bg-primary h-2 rounded-full"></div>
                              <p>100%</p>
                            </div>
                          </div>
                        </div>
                        <button
                          title="Delete image"
                          className="text-xl opacity-60"
                          onClick={() => {
                            onChange(null);
                          }}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative z-[1000]">
              <Controller
                control={control}
                name="deadlineDate"
                render={({
                  field: { onChange, value: selectedValue, ref },
                  formState: { errors }
                }) => (
                  <DatePicker
                    calendarClassName="z-[1000]"
                    popperClassName="z-[1000]"
                    minDate={new Date()}
                    className="z-[1000] w-full"
                    wrapperClassName="w-full"
                    selected={selectedValue || new Date()}
                    onChange={(date) => {
                      if (date) {
                        onChange(date);
                      }
                    }}
                    customInput={
                      <InputField
                        label="Deadline"
                        placeholder="Due Date"
                        value={formatDate(selectedValue ?? undefined)}
                        rightIcon={<MdCalendarToday />}
                        error={errors?.deadlineDate?.message}
                      />
                    }
                  />
                )}
                rules={{
                  required: "Please provide your due date"
                }}
              />
            </div>
            <div className="relative z-[1000]">
              <Controller
                control={control}
                name="deadlineDate"
                render={({
                  field: { onChange, value: selectedValue, ref },
                  formState: { errors }
                }) => (
                  <DatePicker
                    calendarClassName="z-[1000]"
                    popperClassName="z-[1000] "
                    className="z-[1000] "
                    minDate={new Date()}
                    wrapperClassName="w-full"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    selected={selectedValue || new Date()}
                    onChange={(date) => {
                      if (date) {
                        onChange(date);
                      }
                    }}
                    customInput={
                      <InputField
                        label="Time"
                        placeholder="Due time"
                        value={formatTime(selectedValue ?? undefined)}
                        rightIcon={<LuClock3 />}
                        // error={errors?.deadlineDate?.message}
                      />
                    }
                  />
                )}
                rules={{
                  required: "Please provide your due time"
                }}
              />
            </div>
          </div>

          <Button buttonType="primary" className="mt-7">
            {selectedTask ? "Update" : "Save"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
