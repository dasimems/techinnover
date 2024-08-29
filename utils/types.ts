import { HTMLProps } from "react";
import { IconBaseProps, IconType } from "react-icons";

export type TaskPrioritiesType = "HIGH" | "MEDIUM" | "LOW";

export type TaskStatusType = "TO_DO" | "IN_PROGRESS" | "COMPLETED";

export interface CoverImageType {
  path: string;
  name: string;
  size: number;
  type: string;
}

export interface TaskType {
  cover?: CoverImageType | null;
  name: string;
  description?: string;
  priority: TaskPrioritiesType;
  deadlineDate: Date | null;
  // deadlineTime: Date | null;
  createdAt: Date;
  id: string;
  status: TaskStatusType;
}

export interface TaskClassType {
  label: string;
  value: TaskStatusType;
}
export interface TaskPriorityDetailsType {
  label: string;
  value: TaskPrioritiesType;
}
export interface RouteDetailsType {
  path: string;
  label: string;
  Icon: IconType;
}

export type LabelProps = {
  children: React.ReactNode;
  optional?: boolean;
} & HTMLProps<HTMLLabelElement>;

export type InputElementProps = {
  label?: React.ReactNode;
  inputClassName?: string;
  inputParentClassName?: string;
  formClassName?: string;
  labelClassName?: string;
  error?: string;
  optional?: boolean;
} & HTMLProps<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export type InputFieldProps = {
  rightIcon?: React.ReactNode;
  buttonTitle?: string;
  leftIcon?: React.ReactNode;
  rightButtonTitle?: string;
  leftButtonClassName?: string;
  rightButtonClassName?: string;
  leftButtonTitle?: string;
  rightIconAction?: () => void;
  leftIconAction?: () => void;
  iconProps?: IconBaseProps;
} & InputElementProps;

export type SelectOptionType = {
  value: string;
  label: string;
};

export type SelectBoxType = {
  options?: SelectOptionType[];
  emptyOptionLabel?: string;
  hideEmptyOption?: boolean;
} & InputElementProps;
