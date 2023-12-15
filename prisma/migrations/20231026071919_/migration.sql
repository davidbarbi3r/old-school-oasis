/*
  Warnings:

  - Added the required column `versionId` to the `PlatformItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformId` to the `game_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlatformItem" ADD COLUMN     "versionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "game_items" ADD COLUMN     "platformId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "game_items" ADD CONSTRAINT "game_items_gameId_platformId_fkey" FOREIGN KEY ("gameId", "platformId") REFERENCES "GamesOnPlatforms"("gameId", "platformId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformItem" ADD CONSTRAINT "PlatformItem_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "PlatformVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
