/*
  Warnings:

  - You are about to drop the column `linkId` on the `link_payments` table. All the data in the column will be lost.
  - Added the required column `listingId` to the `link_payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "link_payments" DROP COLUMN "linkId",
ADD COLUMN     "listingId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "link_payments" ADD CONSTRAINT "link_payments_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
