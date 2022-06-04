import { formatDistanceToNow } from "date-fns";

export const getFormat = (date: number) => {
  const fromNow = formatDistanceToNow(date);

  return fromNow;
};
