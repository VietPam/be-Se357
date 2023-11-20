/*
  Warnings:

  - You are about to drop the column `bio` on the `Admin` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "bio",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Buyer" ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT true;
