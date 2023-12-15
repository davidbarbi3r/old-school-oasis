-- AddForeignKey
ALTER TABLE "game_items" ADD CONSTRAINT "game_items_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
