/*
  Warnings:

  - The `images` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_sellerId_fkey";

-- AlterTable
ALTER TABLE "Buyer" ADD COLUMN     "addresses" TEXT[];

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "images",
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "addresses" TEXT[];

-- DropTable
DROP TABLE "Address";

-- CreateTable
CREATE TABLE "Buyer_Like_Product" (
    "buyerId" UUID NOT NULL,
    "productId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Buyer_Like_Product_pkey" PRIMARY KEY ("buyerId","productId")
);

-- CreateTable
CREATE TABLE "Buyer_Follow_Seller" (
    "buyerId" UUID NOT NULL,
    "sellerId" UUID NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Buyer_Follow_Seller_pkey" PRIMARY KEY ("buyerId","sellerId")
);

-- CreateTable
CREATE TABLE "ProductOption" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Buyer_Like_Product" ADD CONSTRAINT "Buyer_Like_Product_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buyer_Like_Product" ADD CONSTRAINT "Buyer_Like_Product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buyer_Follow_Seller" ADD CONSTRAINT "Buyer_Follow_Seller_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buyer_Follow_Seller" ADD CONSTRAINT "Buyer_Follow_Seller_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOption" ADD CONSTRAINT "ProductOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
