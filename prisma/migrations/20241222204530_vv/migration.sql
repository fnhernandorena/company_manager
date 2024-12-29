/*
  Warnings:

  - You are about to drop the `Seel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Seel" DROP CONSTRAINT "Seel_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "Seel" DROP CONSTRAINT "Seel_product_id_fkey";

-- DropTable
DROP TABLE "Seel";

-- CreateTable
CREATE TABLE "Sell" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sell_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sell" ADD CONSTRAINT "Sell_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sell" ADD CONSTRAINT "Sell_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
