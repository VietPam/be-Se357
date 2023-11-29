import { PrismaClient } from "@prisma/client";

async function addReview(buyerID, review, productID) {}
async function getReviewsByBuyerID(buyerID) {
  try {
    const dbConnection = new PrismaClient();
    const reviews = await dbConnection.review.findMany({
      where: {
        buyerId: buyerID,
      },
    });
    return reviews;
  } catch (e) {
    throw e;
  }
}

export default { addReview, getReviewsByBuyerID };
