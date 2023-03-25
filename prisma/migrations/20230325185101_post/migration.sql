/*
  Warnings:

  - Changed the type of `views` on the `Posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "shared" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sharedBy" TEXT,
DROP COLUMN "views",
ADD COLUMN     "views" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profiles" ADD COLUMN     "likedPosts" TEXT[],
ADD COLUMN     "posts" TEXT[],
ADD COLUMN     "sharedPosts" TEXT[];
