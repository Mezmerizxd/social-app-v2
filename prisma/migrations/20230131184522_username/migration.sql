/*
  Warnings:

  - Added the required column `username` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profiles" ADD COLUMN     "username" TEXT NOT NULL;
