/*
  Warnings:

  - You are about to drop the `social_networks` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `collectionId` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "social_networks" DROP CONSTRAINT "social_networks_userId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "collectionId" SET NOT NULL;

-- DropTable
DROP TABLE "social_networks";
