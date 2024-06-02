/*
  Warnings:

  - The `id` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `profileId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductRented" DROP CONSTRAINT "ProductRented_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "ProductRented" DROP CONSTRAINT "ProductRented_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductRented" DROP CONSTRAINT "ProductRented_renterId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSold" DROP CONSTRAINT "ProductSold_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSold" DROP CONSTRAINT "ProductSold_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSold" DROP CONSTRAINT "ProductSold_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profileId_fkey";

-- DropIndex
DROP INDEX "Profile_id_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
DROP COLUMN "profileId",
ADD COLUMN     "profileId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_key" ON "User"("profileId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSold" ADD CONSTRAINT "ProductSold_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSold" ADD CONSTRAINT "ProductSold_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSold" ADD CONSTRAINT "ProductSold_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRented" ADD CONSTRAINT "ProductRented_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRented" ADD CONSTRAINT "ProductRented_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRented" ADD CONSTRAINT "ProductRented_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
