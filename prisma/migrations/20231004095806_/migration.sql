/*
  Warnings:

  - You are about to drop the `_GameToPlatform` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GameToPlatform" DROP CONSTRAINT "_GameToPlatform_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToPlatform" DROP CONSTRAINT "_GameToPlatform_B_fkey";

-- DropTable
DROP TABLE "_GameToPlatform";

-- CreateTable
CREATE TABLE "GamesOnPlatforms" (
    "gameId" INTEGER NOT NULL,
    "platformId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GamesOnPlatforms_pkey" PRIMARY KEY ("gameId","platformId")
);

-- AddForeignKey
ALTER TABLE "GamesOnPlatforms" ADD CONSTRAINT "GamesOnPlatforms_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamesOnPlatforms" ADD CONSTRAINT "GamesOnPlatforms_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
