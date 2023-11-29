/*
  Warnings:

  - You are about to drop the column `productID` on the `Review` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productID_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "productID",
ADD COLUMN     "productId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
