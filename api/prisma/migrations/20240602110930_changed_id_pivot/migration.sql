/*
  Warnings:

  - The primary key for the `CategoriesOnProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CategoriesOnProducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CategoriesOnProducts_pkey" PRIMARY KEY ("productId", "categoryId");
