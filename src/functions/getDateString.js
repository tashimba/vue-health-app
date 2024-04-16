export default function getDateString(date) {
  const day = date.getDate();
  const month = date.toLocaleString("ru-RU", { month: "long" });
  return `${day} ${month}`;
}
