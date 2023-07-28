import { v4 as uuidv4 } from "uuid";

/**
 * Use Date.getTime
 */
export const calculateDifferenceBetweenTimes = (
  Current: number,
  Target: number
) => {
  let CalcTime = Current - Target; // Current - Initiallized
  return formatMillisecondsToFriendlyTime(CalcTime);
};

export const formatMillisecondsToFriendlyTime = (ms: number) => {
  let Years = Math.floor(ms / 1000 / 60 / 60 / 24 / 7 / 4 / 12);
  ms -= Years * (1000 * 60 * 60 * 24 * 7 * 4 * 12);
  let Months = Math.floor(ms / 1000 / 60 / 60 / 24 / 7 / 4);
  ms -= Months * (1000 * 60 * 60 * 24 * 7 * 4);
  let Weeks = Math.floor(ms / 1000 / 60 / 60 / 24 / 7);
  ms -= Weeks * (1000 * 60 * 60 * 24 * 7);
  // The calculation seconds to days works properly & The calculation of weeks to years may be off slightly
  let Days = Math.floor(ms / 1000 / 60 / 60 / 24);
  ms -= Days * (1000 * 60 * 60 * 24);
  let Hours = Math.floor(ms / 1000 / 60 / 60);
  ms -= Hours * (1000 * 60 * 60);
  let Minutes = Math.floor(ms / 1000 / 60);
  ms -= Minutes * (1000 * 60);
  let Seconds = Math.floor(ms / 1000);

  let differenceStr =
    (Days != 0 ? Days + (Days == 1 ? "day " : "days ") : "") +
    (Hours != 0
      ? (Hours <= 9 ? "0" + Hours : Hours) + (Hours == 1 ? "hr " : "hrs ")
      : "") +
    (Minutes != 0
      ? (Minutes <= 9 ? "0" + Minutes : Minutes) +
        (Minutes == 1 ? "min " : "mins ")
      : "") +
    (Seconds != 0
      ? (Seconds <= 9 ? "0" + Seconds : Seconds) +
        (Seconds == 1 ? "sec " : "secs ")
      : "");
  return differenceStr.toLowerCase().includes("nan") ? "" : differenceStr;
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
