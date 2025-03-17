-- CreateTable
CREATE TABLE "roles" (
    "id_role" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Utilisateur',

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_picture" TEXT,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "social_networks" (
    "id_network" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "social_networks_pkey" PRIMARY KEY ("id_network")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id_permission" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "write_permission" BOOLEAN NOT NULL,
    "read_permission" BOOLEAN NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id_permission")
);

-- CreateTable
CREATE TABLE "permissions_roles" (
    "id_role" INTEGER NOT NULL,
    "id_permission" INTEGER NOT NULL,

    CONSTRAINT "permissions_roles_pkey" PRIMARY KEY ("id_role","id_permission")
);

-- CreateTable
CREATE TABLE "articles" (
    "id_article" SERIAL NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification_date" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id_article")
);

-- CreateTable
CREATE TABLE "categories" (
    "id_category" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "comments" (
    "id_comment" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER NOT NULL,
    "id_article" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id_comment")
);

-- CreateTable
CREATE TABLE "likes" (
    "id_like" SERIAL NOT NULL,
    "like_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_article" INTEGER NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id_like")
);

-- CreateTable
CREATE TABLE "user_likes" (
    "id_user" INTEGER NOT NULL,
    "id_like" INTEGER NOT NULL,

    CONSTRAINT "user_likes_pkey" PRIMARY KEY ("id_user","id_like")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id_notification" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT,
    "notification_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_status" BOOLEAN NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id_notification")
);

-- CreateTable
CREATE TABLE "collection" (
    "id_user" INTEGER NOT NULL,
    "id_article" INTEGER NOT NULL,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id_user","id_article")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_mail_key" ON "users"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_networks" ADD CONSTRAINT "social_networks_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions_roles" ADD CONSTRAINT "permissions_roles_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions_roles" ADD CONSTRAINT "permissions_roles_id_permission_fkey" FOREIGN KEY ("id_permission") REFERENCES "permissions"("id_permission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_article_fkey" FOREIGN KEY ("id_article") REFERENCES "articles"("id_article") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_id_article_fkey" FOREIGN KEY ("id_article") REFERENCES "articles"("id_article") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_id_like_fkey" FOREIGN KEY ("id_like") REFERENCES "likes"("id_like") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_id_article_fkey" FOREIGN KEY ("id_article") REFERENCES "articles"("id_article") ON DELETE RESTRICT ON UPDATE CASCADE;
