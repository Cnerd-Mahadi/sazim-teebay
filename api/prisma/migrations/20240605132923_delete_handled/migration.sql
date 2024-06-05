-- DropForeignKey
ALTER TABLE "ProductRented" DROP CONSTRAINT "ProductRented_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSold" DROP CONSTRAINT "ProductSold_productId_fkey";

-- AddForeignKey
ALTER TABLE "ProductSold" ADD CONSTRAINT "ProductSold_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRented" ADD CONSTRAINT "ProductRented_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
