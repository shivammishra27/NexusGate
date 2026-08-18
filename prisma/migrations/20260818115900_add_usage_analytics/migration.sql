-- AlterTable
ALTER TABLE "ApiRequest" ADD COLUMN     "estimatedCost" DOUBLE PRECISION,
ADD COLUMN     "inputTokens" INTEGER,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "outputTokens" INTEGER;
