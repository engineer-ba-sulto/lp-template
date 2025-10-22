import { formatInTimeZone } from "date-fns-tz";

export const getCurrentDateInJST = (): string => {
  return formatInTimeZone(new Date(), "Asia/Tokyo", "yyyy-MM-dd HH:mm:ss.SSS");
};
