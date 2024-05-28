/*
  Warnings:

  - You are about to drop the column `txn_hash` on the `listings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "listings" DROP COLUMN "txn_hash";

-- CreateTable
CREATE TABLE "LinkPayment" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "txn_hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinkPayment_pkey" PRIMARY KEY ("id")
);
