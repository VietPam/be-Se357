export function isDateValid(date) {
  return date instanceof Date && !isNaN(date);
}
