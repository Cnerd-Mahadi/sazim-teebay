/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `ProductRented` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `ProductSold` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentPerHour` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductRented` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductSold` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "rentPerHour" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductRented" ADD COLUMN     "productId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ProductSold" ADD COLUMN     "productId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductRented_productId_key" ON "ProductRented"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSold_productId_key" ON "ProductSold"("productId");

-- AddForeignKey
ALTER TABLE "ProductSold" ADD CONSTRAINT "ProductSold_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRented" ADD CONSTRAINT "ProductRented_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
