/*
  Warnings:

  - You are about to drop the `user_likes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_id_like_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_id_user_fkey";

-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "user_likes";

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
