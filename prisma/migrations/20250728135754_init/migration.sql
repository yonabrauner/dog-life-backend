/*
  Warnings:

  - You are about to drop the `WalkDog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WalkDog" DROP CONSTRAINT "WalkDog_dogId_fkey";

-- DropForeignKey
ALTER TABLE "WalkDog" DROP CONSTRAINT "WalkDog_walkId_fkey";

-- DropTable
DROP TABLE "WalkDog";
