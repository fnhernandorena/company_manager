/*
  Warnings:

  - You are about to drop the column `used_by` on the `invitation_link` table. All the data in the column will be lost.
  - Made the column `company_id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_company_id_fkey";

-- DropIndex
DROP INDEX "invitation_link_used_by_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "company_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "invitation_link" DROP COLUMN "used_by";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
