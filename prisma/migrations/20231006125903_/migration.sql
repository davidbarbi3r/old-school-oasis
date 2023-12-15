/*
  Warnings:

  - Added the required column `completed` to the `GameState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `GameState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `working` to the `GameState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completed` to the `PlatformState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `PlatformState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `working` to the `PlatformState` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemCondition" AS ENUM ('new', 'good', 'fair', 'poor', 'broken');

-- CreateEnum
CREATE TYPE "CompletedItem" AS ENUM ('itemOnly', 'itemAndManual', 'itemManualAndBox', 'sealed');

-- CreateEnum
CREATE TYPE "WorkingState" AS ENUM ('working', 'notWorking', 'unknown');

-- AlterTable
ALTER TABLE "GameState" ADD COLUMN     "completed" "CompletedItem" NOT NULL,
ADD COLUMN     "condition" "ItemCondition" NOT NULL,
ADD COLUMN     "pictures" TEXT[],
ADD COLUMN     "working" "WorkingState" NOT NULL;

-- AlterTable
ALTER TABLE "PlatformState" ADD COLUMN     "completed" "CompletedItem" NOT NULL,
ADD COLUMN     "condition" "ItemCondition" NOT NULL,
ADD COLUMN     "pictures" TEXT[],
ADD COLUMN     "working" "WorkingState" NOT NULL;
