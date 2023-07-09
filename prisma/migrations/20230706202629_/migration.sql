-- AlterTable
ALTER TABLE "games" ADD COLUMN     "platform" TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "authProvider" TEXT NOT NULL DEFAULT 'local',
ALTER COLUMN "hash" DROP NOT NULL;
