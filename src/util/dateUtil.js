export function getDisplayTime(systemDateTime) {
  const dateTime = new Date(systemDateTime);
  return `${dateTime.getFullYear()}-${
    dateTime.getMonth() + 1
  }-${dateTime.getDate()} ${dateTime.getHours()}:${dateTime.getMinutes()}`;
}
