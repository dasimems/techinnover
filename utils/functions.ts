import moment from "moment";

export const formatDate = (date?: Date) => {
    if (!date) {
      return;
    }
    return moment(date).format("MMM Do YYYY");
  },
  formatTime = (date?: Date) => {
    if (!date) {
      return;
    }
    return moment(date).format("h:mma");
  },
  convertObjectToArray = <T extends Record<string, any>>(
    data: T
  ): Array<T[keyof T]> => {
    return Object.values(data);
  },
  formatFileSize = (bytes: number) => {
    if (bytes < 1048576) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };
