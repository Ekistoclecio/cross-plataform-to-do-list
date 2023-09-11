export default function differenceInDaysOfTwoDates(
  date1: string,
  date2: string
) {
  const diffInMs = new Date(date1).getTime() - new Date(date2).getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays < 0) {
    return 2;
  } else if (diffInDays <= 3) {
    return 1;
  } else {
    return 0;
  }
}
