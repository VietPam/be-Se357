import { PrismaClient } from "@prisma/client";
export class CartItemDAO {
  #databaseConnection;
  constructor() {
    this.#databaseConnection = new PrismaClient();
  }

  async getCartItemByID(id) {}

  async createCartItem(newCartItem) {
    try {
      await this.#databaseConnection.$connect();
      await this.#databaseConnection.cartItem.create({
        data: newCartItem,
      });
      await this.#databaseConnection.$disconnect();
    } catch (e) {
      const error = new ConflictError(e.message);
      throw e;
    }
  }

  async deleteCartItem(cartItemId) {
    try {
      await this.#databaseConnection.$connect();
      await this.#databaseConnection.cartItem.delete({
        where: {
          id: cartItemId,
        },
      });
      await this.#databaseConnection.$disconnect();
    } catch (e) {
      const error = new ConflictError(e.message);
      throw e;
    }
  }
}
