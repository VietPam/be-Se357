export function isDateValid(dateString) {
  return !isNaN(Date.parse(dateString));
}
