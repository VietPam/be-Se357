import { PrismaClient } from "@prisma/client";
import { ConflictError, NotFoundError } from "../../../common/errors.js";

const PRODUCT_NOT_FOUND = "Product is not found";
export class ProductDAO {
  #databaseConnection;
  constructor() {
    this.#databaseConnection = new PrismaClient();
  }

  async getProductByID(id) {
    try {
      await this.#databaseConnection.$connect();
      const product = await this.#databaseConnection.product.findUnique({
        where: {
          id: id,
        },
      });
      await this.#databaseConnection.$disconnect();
      return new Promise((resolve, reject) => {
        if (product) {
          resolve(product);
        } else {
          const error = new NotFoundError(PRODUCT_NOT_FOUND);
          reject(error);
        }
      });
    } catch (e) {
      throw e;
    }
  }

  createProduct(newProduct) {}

  updateProduct(id, updatedData) {}
}
