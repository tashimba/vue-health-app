export default function ParseDate(dateValue) {
  if (dateValue) {
    const parseDay =
      dateValue.getDate() <= 9
        ? "0" + dateValue.getDate()
        : dateValue.getDate();
    const month = dateValue.getMonth() + 1;
    const parseMonth = month < 9 ? "0" + month : month;

    return parseDay + "." + parseMonth + "." + dateValue.getFullYear();
  }
}
