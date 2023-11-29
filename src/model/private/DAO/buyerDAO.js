import { PrismaClient } from "@prisma/client";
import { ConflictError, NotFoundError } from "../../../common/errors.js";

const USER_NOT_FOUND = "This user is not found";

export class BuyerDAO {
  #databaseConnection;
  constructor() {
    this.#databaseConnection = new PrismaClient();
  }

  async getBuyers(limit) {
    try {
      await this.#databaseConnection.$connect();
      const buyers = await this.#databaseConnection.buyer.findMany({
        take: limit,
      });
      await this.#databaseConnection.$disconnect();
      return buyers;
    } catch (e) {
      throw e;
    }
  }

  async getBuyerByID(id) {
    try {
      await this.#databaseConnection.$connect();
      const buyer = await this.#databaseConnection.buyer.findUnique({
        where: {
          id: id,
        },
      });
      await this.#databaseConnection.$disconnect();
      return new Promise((resolve, reject) => {
        if (user) {
          resolve(buyer);
        } else {
          const error = new NotFoundError(USER_NOT_FOUND);
          reject(error);
        }
      });
    } catch (e) {
      throw e;
    }
  }

  async getBuyerByEmail(email) {
    try {
      await this.#databaseConnection.$connect();
      const buyer = await this.#databaseConnection.buyer.findUnique({
        where: {
          email: email,
        },
      });
      await this.#databaseConnection.$disconnect();
      return new Promise((resolve, reject) => {
        if (buyer) {
          resolve(buyer);
        } else {
          const error = new NotFoundError(USER_NOT_FOUND);
          reject(error);
        }
      });
    } catch (e) {
      throw e;
    }
  }

  async createBuyer(newBuyerData) {
    try {
      await this.#databaseConnection.$connect();
      await this.#databaseConnection.buyer.create({
        data: { newBuyerData },
      });
      await this.#databaseConnection.$disconnect();
    } catch (e) {
      const error = new ConflictError(e.message);
      throw e;
    }
  }
  /**
   *
   * @param {string} id
   * @param {string[]} updatedColumns
   * @param {string[]} values
   */
  async updateBuyer(id, updatedDatasObject) {
    try {

      await this.#databaseConnection.$connect();
      await this.#databaseConnection.buyer.update({
        where: {
          id: id,
        },
        data: updatedDatasObject,
      });
      await this.#databaseConnection.$disconnect();
    } catch (e) {
      throw e;
    }
  }
}
