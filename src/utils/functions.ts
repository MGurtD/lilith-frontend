import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

Date.prototype.toJSON = function () {
  const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
  this.setHours(hoursDiff);
  return this.toISOString();
};

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

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",

    currency: "EUR",
  }).format(value);
};

export const convertDateTimeToJSON = (dateTime: any): any => {
  if (dateTime instanceof Date) {
    const hoursDiff = dateTime.getHours() - dateTime.getTimezoneOffset() / 60;
    dateTime.setHours(hoursDiff);
    return dateTime.toISOString();
  } else if (_.isString(dateTime)) {
    return convertDateTimeToJSON(convertDDMMYYYYToDate(dateTime));
    /*try {
      var dateTimeInstance = new Date(dateTime);
      console.log("ok - ", dateTimeInstance);
      return convertDateTimeToJSON(dateTimeInstance);
    } catch (err) {
      console.log("ko");
      return convertDateTimeToJSON(convertDDMMYYYYToDate(dateTime));
    }*/
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

export const extractTime = (isoString: string | null): string => {
  if (isoString) {
    const date = new Date(isoString);
    // Formatea la hora, minutos y segundos
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = "00";
    // Retorna la hora en formato HH:mm:ss
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return "";
  }
};

export function calculateTimeDifference(startDateString: string) {
  const startDate = new Date(startDateString);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - startDate.getTime();
  if (diffInMilliseconds < 0) {
    return 0;
  }

  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return formattedTime;
}

export function loadImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    const url = URL.createObjectURL(blob);
    img.src = url;
  });
}
