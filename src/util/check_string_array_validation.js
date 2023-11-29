export function isStringArray(arr) {
  if (!Array.isArray(arr)) {
    return false; // Not an array
  }

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "string") {
      return false; // Element at index i is not a string
    }
  }

  return true; // All elements are strings
}
