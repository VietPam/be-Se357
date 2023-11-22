/*
  Warnings:

  - You are about to drop the column `is_active` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Buyer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "is_active",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Buyer" DROP COLUMN "is_active";
