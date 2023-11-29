-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "avatar" BYTEA,
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Buyer" ADD COLUMN     "avatar" BYTEA;

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "avatar" BYTEA;
