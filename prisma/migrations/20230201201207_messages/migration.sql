-- AlterTable
ALTER TABLE "Profiles" ADD COLUMN     "friendRequestsReceived" INTEGER[],
ADD COLUMN     "friendRequestsSent" INTEGER[],
ADD COLUMN     "friends" INTEGER[],
ADD COLUMN     "messageGroups" INTEGER[];

-- CreateTable
CREATE TABLE "MessageGroups" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "messageId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupId" INTEGER,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageGroups_groupId_key" ON "MessageGroups"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Messages_userId_key" ON "Messages"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Messages_groupId_key" ON "Messages"("groupId");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "MessageGroups"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;
