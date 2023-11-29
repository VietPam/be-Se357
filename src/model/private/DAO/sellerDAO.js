import { PrismaClient } from "@prisma/client";
import { ConflictError, NotFoundError } from "../../../common/errors.js";

const USER_NOT_FOUND = "This user is not found";

export class SellerDAO {
  #databaseConnection;
  constructor() {
    this.#databaseConnection = new PrismaClient();
  }

  async getSellerByID(id) {
    try {
      await this.#databaseConnection.$connect();
      const seller = await this.#databaseConnection.seller.findUnique({
        where: {
          id: id,
        },
      });
      await this.#databaseConnection.$disconnect();
      return new Promise((resolve, reject) => {
        if (seller) {
          resolve(seller);
        } else {
          const error = new NotFoundError(USER_NOT_FOUND);
          reject(error);
        }
      });
    } catch (e) {
      throw e;
    }
  }

  async getSellerByEmail(email) {
    try {
      await this.#databaseConnection.$connect();
      const seller = await this.#databaseConnection.seller.findUnique({
        where: {
          email: email,
        },
      });
      await this.#databaseConnection.$disconnect();
      return new Promise((resolve, reject) => {
        if (seller) {
          resolve(seller);
        } else {
          const error = new NotFoundError(USER_NOT_FOUND);
          reject(error);
        }
      });
    } catch (e) {
      throw e;
    }
  }

  async createSeller(newSeller) {
    try {
      await this.#databaseConnection.$connect();
      await this.#databaseConnection.seller.create({
        data: {
          email: newSeller.email,
          password: newSeller.password,
          birthday: newSeller.birthday,
          name: newSeller.name,
        },
      });
      await this.#databaseConnection.$disconnect();
    } catch (e) {
      throw e;
    }
  }

  async updateSeller(id, updatedDatas) {
    try {
      await this.#databaseConnection.$connect();
      await this.#databaseConnection.seller.update({
        where: {
          id: id,
        },
        data: updatedDatas,
      });
      await this.#databaseConnection.$disconnect();
    } catch (e) {
      throw e;
    }
  }
}
