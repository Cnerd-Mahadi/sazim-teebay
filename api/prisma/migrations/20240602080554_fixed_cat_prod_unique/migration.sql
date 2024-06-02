-- DropIndex
DROP INDEX "CategoriesOnProducts_categoryId_key";

-- DropIndex
DROP INDEX "CategoriesOnProducts_productId_key";

-- AlterTable
ALTER TABLE "CategoriesOnProducts" ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "CategoriesOnProducts_pkey" PRIMARY KEY ("id");
