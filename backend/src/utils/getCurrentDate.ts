export default function getCurrentDate() {
  let today = new Date();
  let dd: string;
  let mm: string;
  let yyyy = today.getFullYear();

  if (today.getDate() < 10) {
    dd = "0" + today.getDate();
  } else {
    dd = today.getDate().toString();
  }

  if (today.getMonth() + 1 < 10) {
    mm = "0" + (today.getMonth() + 1);
  } else {
    mm = (today.getMonth() + 1).toString();
  }

  console.log(yyyy + "-" + mm + "-" + dd);
  return yyyy + "-" + mm + "-" + dd;
}
