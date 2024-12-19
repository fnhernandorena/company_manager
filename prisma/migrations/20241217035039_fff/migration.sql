/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Name` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "company_id" TEXT NOT NULL,
ADD COLUMN     "number" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "invitation_link" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "used_by" TEXT,

    CONSTRAINT "invitation_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invitation_link_used_by_key" ON "invitation_link"("used_by");

-- CreateIndex
CREATE UNIQUE INDEX "Name_name_key" ON "Name"("name");
