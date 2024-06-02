/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "ownerId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_ownerId_key" ON "Product"("ownerId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
