/*
  Warnings:

  - You are about to drop the `permissions_roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roleId` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permissions_roles" DROP CONSTRAINT "permissions_roles_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "permissions_roles" DROP CONSTRAINT "permissions_roles_roleId_fkey";

-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "roleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "permissions_roles";

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;
