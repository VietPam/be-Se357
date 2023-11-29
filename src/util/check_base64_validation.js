export function isBase64(str) {
    if (typeof str !== 'string') {
      return false;
    }
  
    // Regular expression to check if the string is a valid base64 string
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  
    return base64Regex.test(str);
  }