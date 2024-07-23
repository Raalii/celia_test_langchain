/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gender" TEXT NOT NULL DEFAULT 'male',
ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'B1',
ALTER COLUMN "name" SET NOT NULL;
