/*
  Warnings:

  - Added the required column `startsAt` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rental" ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL;
