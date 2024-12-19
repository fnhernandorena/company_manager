/*
  Warnings:

  - You are about to drop the `_InvoiceSeels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductSeels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserInvoices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company_id` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_InvoiceSeels" DROP CONSTRAINT "_InvoiceSeels_A_fkey";

-- DropForeignKey
ALTER TABLE "_InvoiceSeels" DROP CONSTRAINT "_InvoiceSeels_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductSeels" DROP CONSTRAINT "_ProductSeels_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductSeels" DROP CONSTRAINT "_ProductSeels_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserInvoices" DROP CONSTRAINT "_UserInvoices_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserInvoices" DROP CONSTRAINT "_UserInvoices_B_fkey";

-- AlterTable
ALTER TABLE "Brand" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Buyer" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "company_id" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Name" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_InvoiceSeels";

-- DropTable
DROP TABLE "_ProductSeels";

-- DropTable
DROP TABLE "_UserInvoices";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
