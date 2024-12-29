-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_buyer_id_fkey";

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "buyer_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "Buyer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
