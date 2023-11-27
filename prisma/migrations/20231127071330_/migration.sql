/*
  Warnings:

  - You are about to drop the column `birthday` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `birthday` on the `Seller` table. All the data in the column will be lost.
  - Added the required column `bio` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "birthday";

-- AlterTable
ALTER TABLE "Buyer" ADD COLUMN     "gender" "Gender",
ADD COLUMN     "phones" TEXT[],
ALTER COLUMN "birthday" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "birthday",
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "phones" TEXT[],
ALTER COLUMN "isActive" SET DEFAULT false;
