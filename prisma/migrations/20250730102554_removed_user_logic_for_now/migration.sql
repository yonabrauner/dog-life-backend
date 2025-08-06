/*
  Warnings:

  - You are about to drop the column `walkerId` on the `Walk` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `walkerName` to the `Walk` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Walk" DROP CONSTRAINT "Walk_walkerId_fkey";

-- AlterTable
ALTER TABLE "Walk" DROP COLUMN "walkerId",
ADD COLUMN     "walkerName" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";
