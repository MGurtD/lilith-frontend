import { v4 as uuidv4 } from "uuid";

export const convertDDMMYYYYToDate = (strDate: string): any => {
  const strDateParts = strDate.split("/");
  if (strDateParts.length === 3) {
    return createDate(
      parseInt(strDateParts[0]),
      parseInt(strDateParts[1]),
      parseInt(strDateParts[2])
    );
  }
};

export const createDate = (
  days: number,
  months: number,
  years: number
): Date => {
  let date = new Date();
  date.setDate(days);
  date.setMonth(months - 1);
  date.setFullYear(years);
  return date;
};

export const createDateFromNow = (
  daysToAdd: number,
  monthsToAdd: number,
  yearsToAdd: number
): Date => {
  let date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  date.setMonth(date.getMonth() + monthsToAdd);
  date.setFullYear(date.getFullYear() + yearsToAdd);
  return date;
};

export const formatDate = (date: string | Date) => {
  const formatter = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Europe/Madrid",
  });

  let formattedDate = "";
  try {
    formattedDate = formatter.format(new Date(date));
  } catch (err) {}

  return formattedDate;
};

export const formatDateTime = (dateTime: string) => {
  const formatter = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Europe/Madrid",
  });

  return formatter.format(new Date(dateTime));
};

export const convertDateTimeToJSON = (dateTime: any): any => {
  if (dateTime instanceof Date) {
    const hoursDiff = dateTime.getHours() - dateTime.getTimezoneOffset() / 60;
    dateTime.setHours(hoursDiff);
    return dateTime.toISOString();
  } else {
    return convertDateTimeToJSON(convertDDMMYYYYToDate(dateTime));
  }
};

export const formatDateForQueryParameter = (date: Date): string => {
  return convertDateTimeToJSON(date).split("T")[0];
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
