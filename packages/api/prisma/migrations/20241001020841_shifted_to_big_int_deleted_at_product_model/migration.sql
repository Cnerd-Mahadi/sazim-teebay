/*
  Warnings:

  - The primary key for the `CategoriesOnProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_productProductId_productDeletedAt_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_productProductId_productDeletedAt_fkey";

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_productProductId_productDeletedAt_fkey";

-- AlterTable
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_pkey",
ALTER COLUMN "productDeletedAt" SET DATA TYPE BIGINT,
ADD CONSTRAINT "CategoriesOnProducts_pkey" PRIMARY KEY ("productProductId", "productDeletedAt", "categoryId");

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "deletedAt" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("productId", "deletedAt");

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "productDeletedAt" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Rental" ALTER COLUMN "productDeletedAt" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "CategoriesOnProducts" ADD CONSTRAINT "CategoriesOnProducts_productProductId_productDeletedAt_fkey" FOREIGN KEY ("productProductId", "productDeletedAt") REFERENCES "Product"("productId", "deletedAt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_productProductId_productDeletedAt_fkey" FOREIGN KEY ("productProductId", "productDeletedAt") REFERENCES "Product"("productId", "deletedAt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_productProductId_productDeletedAt_fkey" FOREIGN KEY ("productProductId", "productDeletedAt") REFERENCES "Product"("productId", "deletedAt") ON DELETE RESTRICT ON UPDATE CASCADE;
