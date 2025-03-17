/*
  Warnings:

  - You are about to drop the column `image` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `id_article` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `social_networks` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articleId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `social_networks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_id_user_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_id_user_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_id_article_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_id_user_fkey";

-- DropForeignKey
ALTER TABLE "social_networks" DROP CONSTRAINT "social_networks_id_user_fkey";

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "id_user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "id_user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "id_article",
ADD COLUMN     "articleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "id_user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "social_networks" DROP COLUMN "id_user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profile_picture";

-- AddForeignKey
ALTER TABLE "social_networks" ADD CONSTRAINT "social_networks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id_article") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
