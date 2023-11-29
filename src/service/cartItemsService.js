import { PrismaClient } from "@prisma/client";
import { CartItemDAO } from "../model/private/DAO/cartItemDAO.js";

async function createCartItem(buyerID, newCartItem) {
  try {
    const cartItem = {
      buyerId: buyerID,
      quantity: newCartItem.quantity,
      productId: newCartItem.productId,
    };
    const cartReposity = new CartItemDAO();
    await cartReposity.createCartItem(cartItem);
  } catch (e) {
    throw e;
  }
}

async function deleteCartItem(cartItemId)
{
try{
  const cartReposity = new CartItemDAO();
  await cartReposity.deleteCartItem(cartItemId);
}
catch(e)
{
  throw e;
}
}

export default { createCartItem,deleteCartItem };
