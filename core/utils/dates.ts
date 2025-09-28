import { format, isThisWeek, isThisYear, isToday, parseISO } from "date-fns";

export const formattedDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
};

function formatNotificationDate(dateInput: Date | string) {
  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;

  if (isToday(date)) {
    return format(date, "h:mm a");
  } else if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, "EEE");
  } else if (isThisYear(date)) {
    return format(date, "MMM d");
  } else {
    return format(date, "MMM, yyyy");
  }
}

export default formatNotificationDate;
