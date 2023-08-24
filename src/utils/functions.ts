import { v4 as uuidv4 } from "uuid";

export const createDate = (
  days: number,
  months: number,
  years: number
): Date => {
  var date = new Date();
  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);
  return date;
};

export const formatDate = (date: string | Date) => {
  const formatter = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Europe/Madrid",
  });

  return formatter.format(new Date(date));
};

export const convertDateTimeToJSON = (dateTime: any) => {
  if (dateTime instanceof Date) {
    const hoursDiff = dateTime.getHours() - dateTime.getTimezoneOffset() / 60;
    dateTime.setHours(hoursDiff);
    return dateTime.toISOString();
  } else {
    return dateTime;
  }
};

export const formatDateTime = (dateTime: string) => {
  const formatter = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Europe/Madrid",
  });

  return formatter.format(new Date(dateTime));
};

export const formatDateForQueryParameter = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const createBlobAndDownloadFile = (name: string, data: any) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getNewUuid = () => {
  return uuidv4();
};
