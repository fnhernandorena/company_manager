-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Seel" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "company_id" DROP NOT NULL;
