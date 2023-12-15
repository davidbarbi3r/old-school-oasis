/*
  Warnings:

  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "game_items" DROP CONSTRAINT "game_items_stateId_fkey";

-- DropTable
DROP TABLE "State";

-- CreateTable
CREATE TABLE "PlatformItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "platformId" INTEGER NOT NULL,
    "collectionId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "PlatformItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameState" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "GameState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformState" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PlatformState_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "game_items" ADD CONSTRAINT "game_items_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "GameState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformItem" ADD CONSTRAINT "PlatformItem_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformItem" ADD CONSTRAINT "PlatformItem_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformItem" ADD CONSTRAINT "PlatformItem_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "PlatformState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
