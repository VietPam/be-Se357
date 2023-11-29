export function isInvalidPropertiesObject(object, validProperties) {
  // Lọc các thuộc tính không mong muốn trong đối tượng
  const filteredObject = Object.keys(object)
    .filter((key) => !propertiesToKeep.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
  // Trả về đối tượng mới chỉ chứa các thuộc tính mong muốn
  return filteredObject;
}
