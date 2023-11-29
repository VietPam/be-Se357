import { PrismaClient } from "@prisma/client";

function createOrder(buyerID, productID, quantity) {}
function changeOrderStatus(orderID, status) {}
function getOrderByID(orderID) {}
async function getOrdersByUserID(userID) {
  try {
    const dbConnection = new PrismaClient();
    const orders = await dbConnection.order.findMany({
      where: {
        OR: [
          {
            buyerId: userID,
          },
          {
            sellerId: userID,
          },
        ],
      },
    });
    return orders;
  } catch (e) {
    throw e;
  }
}

export default {
  createOrder,
  changeOrderStatus,
  getOrderByID,
  getOrdersByUserID,
};
