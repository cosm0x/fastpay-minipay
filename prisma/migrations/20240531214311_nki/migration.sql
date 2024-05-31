/*
  Warnings:

  - You are about to drop the column `amount` on the `listings` table. All the data in the column will be lost.
  - Added the required column `rate` to the `listings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "listings" DROP COLUMN "amount",
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL;
