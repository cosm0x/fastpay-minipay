/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `listings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "listings_uid_key" ON "listings"("uid");
