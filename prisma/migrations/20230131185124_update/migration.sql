/*
  Warnings:

  - You are about to drop the column `profileId` on the `Profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_profileId_fkey";

-- DropIndex
DROP INDEX "Profiles_profileId_key";

-- AlterTable
ALTER TABLE "Accounts" ALTER COLUMN "userId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "profileId",
ADD COLUMN     "userId" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_userId_key" ON "Accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_userId_key" ON "Profiles"("userId");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
