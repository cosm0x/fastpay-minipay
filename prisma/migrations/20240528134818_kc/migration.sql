/*
  Warnings:

  - You are about to drop the `LinkPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LinkPayment";

-- CreateTable
CREATE TABLE "link_payments" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "txn_hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "link_payments_pkey" PRIMARY KEY ("id")
);
