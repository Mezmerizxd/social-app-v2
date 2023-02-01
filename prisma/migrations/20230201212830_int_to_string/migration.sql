/*
  Warnings:

  - You are about to drop the column `description` on the `MessageGroups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_groupId_fkey";

-- AlterTable
ALTER TABLE "MessageGroups" DROP COLUMN "description",
ALTER COLUMN "groupId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "messageId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "groupId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Profiles" ALTER COLUMN "friendRequestsReceived" SET DATA TYPE TEXT[],
ALTER COLUMN "friendRequestsSent" SET DATA TYPE TEXT[],
ALTER COLUMN "friends" SET DATA TYPE TEXT[],
ALTER COLUMN "messageGroups" SET DATA TYPE TEXT[];

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "MessageGroups"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;
