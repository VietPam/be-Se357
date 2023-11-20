export function isEmailValid(email) {
  // Regular expression for a basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the input is a string
  if (typeof email !== "string") {
    return false;
  }

  // Check if the string matches the email regex
  if (!emailRegex.test(email)) {
    return false;
  }

  // Split the email address into local and domain parts
  const [localPart, domainPart] = email.split("@");

  // Check if the local and domain parts are not empty
  if (!localPart || !domainPart) {
    return false;
  }

  // Check if the domain part contains at least one dot (.)
  if (domainPart.indexOf(".") === -1) {
    return false;
  }

  // Check if the email address doesn't start or end with a dot (.)
  if (email[0] === "." || email[email.length - 1] === ".") {
    return false;
  }

  // Check if there are no consecutive dots in the local part
  if (localPart.includes("..")) {
    return false;
  }

  // Check if there are no consecutive dots in the domain part
  if (domainPart.includes("..")) {
    return false;
  }

  // Check if the length of the domain part is at least 2 characters
  if (domainPart.length < 2) {
    return false;
  }

  return true;
}
