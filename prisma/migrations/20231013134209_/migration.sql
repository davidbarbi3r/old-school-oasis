/*
  Warnings:

  - The values [sealed] on the enum `CompletedItem` will be removed. If these variants are still used in the database, this will fail.
  - The values [new] on the enum `ItemCondition` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "BoughtFrom" AS ENUM ('online', 'localStore', 'garageSale', 'particular', 'other');

-- AlterEnum
BEGIN;
CREATE TYPE "CompletedItem_new" AS ENUM ('itemOnly', 'itemAndManual', 'itemManualAndBox');
ALTER TABLE "GameState" ALTER COLUMN "completed" TYPE "CompletedItem_new" USING ("completed"::text::"CompletedItem_new");
ALTER TABLE "PlatformState" ALTER COLUMN "completed" TYPE "CompletedItem_new" USING ("completed"::text::"CompletedItem_new");
ALTER TYPE "CompletedItem" RENAME TO "CompletedItem_old";
ALTER TYPE "CompletedItem_new" RENAME TO "CompletedItem";
DROP TYPE "CompletedItem_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ItemCondition_new" AS ENUM ('sealed', 'good', 'fair', 'poor', 'broken');
ALTER TABLE "GameState" ALTER COLUMN "condition" TYPE "ItemCondition_new" USING ("condition"::text::"ItemCondition_new");
ALTER TABLE "PlatformState" ALTER COLUMN "condition" TYPE "ItemCondition_new" USING ("condition"::text::"ItemCondition_new");
ALTER TYPE "ItemCondition" RENAME TO "ItemCondition_old";
ALTER TYPE "ItemCondition_new" RENAME TO "ItemCondition";
DROP TYPE "ItemCondition_old";
COMMIT;

-- AlterTable
ALTER TABLE "GameState" ADD COLUMN     "boughtAt" TIMESTAMP(3),
ADD COLUMN     "boughtFrom" "BoughtFrom";
