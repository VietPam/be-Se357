export function isValidPropertiesObject(object, validProperties) {
  // Lọc các thuộc tính không mong muốn trong đối tượng
  const objectKeys = Object.keys(object);
  for (const key of objectKeys) {
    // Nếu một trong các thuộc tính không khớp với danh sách mong muốn, trả về false
    if (!validProperties.includes(key)) {
      return false;
    }
  }

  // Nếu tất cả các thuộc tính đều khớp với danh sách mong muốn, trả về true
  return true;
}
