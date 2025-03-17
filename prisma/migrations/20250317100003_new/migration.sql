/*
  Warnings:

  - You are about to drop the column `id_category` on the `articles` table. All the data in the column will be lost.
  - The primary key for the `collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_article` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `id_article` on the `comments` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articleId` to the `collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articleId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collectionId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_id_category_fkey";

-- DropForeignKey
ALTER TABLE "collection" DROP CONSTRAINT "collection_id_article_fkey";

-- DropForeignKey
ALTER TABLE "collection" DROP CONSTRAINT "collection_id_user_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_id_article_fkey";

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "id_category",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "collection" DROP CONSTRAINT "collection_pkey",
DROP COLUMN "id_article",
DROP COLUMN "id_user",
ADD COLUMN     "articleId" INTEGER NOT NULL,
ADD COLUMN     "id_collection" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "collection_pkey" PRIMARY KEY ("id_collection");

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "id_article",
ADD COLUMN     "articleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "collectionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id_article") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id_article") ON DELETE RESTRICT ON UPDATE CASCADE;
