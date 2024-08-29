import { MdGridView } from "react-icons/md";
import { convertObjectToArray } from "./functions";
import { SlSettings } from "react-icons/sl";
import { PiCalendarDotsBold } from "react-icons/pi";
import { RiBriefcaseLine, RiMenuLine } from "react-icons/ri";
import {
  RouteDetailsType,
  TaskClassType,
  TaskPriorityDetailsType
} from "./types";

export const siteName = "Techinnover",
  siteShortName = "Techinnover",
  SEODescription = "",
  localStorageKey = "localStorageKey",
  Routes: {
    [name: string]: RouteDetailsType;
  } = {
    Calendar: {
      path: "/",
      label: "Callendar",
      Icon: MdGridView
    },
    Inbox: {
      path: "",
      label: "Inbox",
      Icon: RiBriefcaseLine
    },
    Notes: {
      path: "",
      label: "Notes",
      Icon: RiMenuLine
    },
    TODO: {
      path: "",
      label: "TODO List",
      Icon: PiCalendarDotsBold
    },
    Settings: {
      path: "",
      label: "Settings",
      Icon: SlSettings
    }
  },
  taskStatus: {
    [name: string]: TaskClassType;
  } = {
    todo: {
      label: "To do",
      value: "TO_DO"
    },
    progress: {
      label: "In progress",
      value: "IN_PROGRESS"
    },
    completed: {
      label: "Completed",
      value: "COMPLETED"
    }
  },
  taskPriorities: {
    [name: string]: TaskPriorityDetailsType;
  } = {
    low: {
      label: "Low",
      value: "LOW"
    },
    high: {
      label: "High",
      value: "HIGH"
    },
    medium: {
      label: "Medium",
      value: "MEDIUM"
    }
  },
  allRoutes = convertObjectToArray(Routes),
  allTaskPriorities = convertObjectToArray(taskPriorities),
  allTaskStatus = convertObjectToArray(taskStatus);
