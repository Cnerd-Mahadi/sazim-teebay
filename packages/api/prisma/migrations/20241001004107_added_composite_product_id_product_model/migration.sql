/*
  Warnings:

  - The primary key for the `CategoriesOnProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `CategoriesOnProducts` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Rental` table. All the data in the column will be lost.
  - Added the required column `productDeletedAt` to the `CategoriesOnProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productProductId` to the `CategoriesOnProducts` table without a default value. This is not possible if the table is not empty.
  - The required column `productId` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `productDeletedAt` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productProductId` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productDeletedAt` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productProductId` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_productId_fkey";

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_productId_fkey";

-- AlterTable
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_pkey",
DROP COLUMN "productId",
ADD COLUMN     "productDeletedAt" INTEGER NOT NULL,
ADD COLUMN     "productProductId" TEXT NOT NULL,
ADD CONSTRAINT "CategoriesOnProducts_pkey" PRIMARY KEY ("productProductId", "productDeletedAt", "categoryId");

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "id",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("productId", "deletedAt");

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "productId",
ADD COLUMN     "productDeletedAt" INTEGER NOT NULL,
ADD COLUMN     "productProductId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "productId",
ADD COLUMN     "productDeletedAt" INTEGER NOT NULL,
ADD COLUMN     "productProductId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CategoriesOnProducts" ADD CONSTRAINT "CategoriesOnProducts_productProductId_productDeletedAt_fkey" FOREIGN KEY ("productProductId", "productDeletedAt") REFERENCES "Product"("productId", "deletedAt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnProducts" ADD CONSTRAINT "CategoriesOnProducts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_productProductId_productDeletedAt_fkey" FOREIGN KEY ("productProductId", "productDeletedAt") REFERENCES "Product"("productId", "deletedAt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_productProductId_productDeletedAt_fkey" FOREIGN KEY ("productProductId", "productDeletedAt") REFERENCES "Product"("productId", "deletedAt") ON DELETE RESTRICT ON UPDATE CASCADE;
