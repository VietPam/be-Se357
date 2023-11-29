export const isCartItem = (object) => {
  // Kiểm tra xem object có chứa đủ 3 thuộc tính buyerId, quantity và productId hay không
  if (
    Object.prototype.hasOwnProperty.call(object, "quantity") &&
    Object.prototype.hasOwnProperty.call(object, "productId")
  ) {
    // Kiểm tra điều kiện của từng thuộc tính\
    const isQuantityValid =
      Number.isInteger(object.quantity) && object.quantity > 0;
    const isProductIdValid = typeof object.productId === "string";

    // Trả về kết quả kiểm tra
    return isQuantityValid && isProductIdValid;
  }

  return false; // Nếu object không chứa đủ 3 thuộc tín
};

export const isValidCart = (arrayOfObject) => {
  if (
    !arrayOfObject.every((item) => typeof item === "object") ||
    !Array.isArray(arrayOfObject)
  ) {
    return false;
  }
  return arrayOfObject.every((obj) => {
    return isCartItem(obj);
  });
};
