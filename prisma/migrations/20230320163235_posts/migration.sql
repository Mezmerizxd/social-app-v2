-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "postId" TEXT NOT NULL,
    "replyTo" TEXT,
    "avatar" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" TEXT[],
    "shares" TEXT[],
    "views" TEXT[],
    "replies" TEXT[],

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Posts_postId_key" ON "Posts"("postId");
