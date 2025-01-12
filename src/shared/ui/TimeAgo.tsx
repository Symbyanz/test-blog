import { parseISO, formatDistanceToNow } from "date-fns";
interface IimeAgoProps {
  timestamp: string;
}

export default function TimeAgo({ timestamp }: IimeAgoProps) {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <time dateTime={timestamp} title={timestamp}>
      &nbsp;<i>{timeAgo}</i>
    </time>
  );
}
