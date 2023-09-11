export default function formatDate(date: Date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let formatedMonth: string;
  let formatedDay: string;

  if (month < 10) {
    formatedMonth = `0${month}`;
  } else {
    formatedMonth = month.toString();
  }
  if (day < 10) {
    formatedDay = `0${day}`;
  } else {
    formatedDay = day.toString();
  }
  return `${year}-${formatedMonth}-${formatedDay}`;
}
