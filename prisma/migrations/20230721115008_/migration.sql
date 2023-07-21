/*
  Warnings:

  - The primary key for the `Platform` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `games` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `releaseDate` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "game_items" DROP CONSTRAINT "game_items_gameId_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_platformId_fkey";

-- AlterTable
ALTER TABLE "Platform" DROP CONSTRAINT "Platform_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Platform_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Platform_id_seq";

-- AlterTable
ALTER TABLE "game_items" ALTER COLUMN "gameId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "games" DROP CONSTRAINT "games_pkey",
ADD COLUMN     "releaseDate" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "platformId" SET DATA TYPE TEXT,
ADD CONSTRAINT "games_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "games_id_seq";

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_items" ADD CONSTRAINT "game_items_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
