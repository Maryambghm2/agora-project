/*
  Warnings:

  - The primary key for the `permissions_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_permission` on the `permissions_roles` table. All the data in the column will be lost.
  - You are about to drop the column `id_role` on the `permissions_roles` table. All the data in the column will be lost.
  - Added the required column `permissionId` to the `permissions_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `permissions_roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permissions_roles" DROP CONSTRAINT "permissions_roles_id_permission_fkey";

-- DropForeignKey
ALTER TABLE "permissions_roles" DROP CONSTRAINT "permissions_roles_id_role_fkey";

-- AlterTable
ALTER TABLE "permissions_roles" DROP CONSTRAINT "permissions_roles_pkey",
DROP COLUMN "id_permission",
DROP COLUMN "id_role",
ADD COLUMN     "permissionId" INTEGER NOT NULL,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD CONSTRAINT "permissions_roles_pkey" PRIMARY KEY ("roleId", "permissionId");

-- AddForeignKey
ALTER TABLE "permissions_roles" ADD CONSTRAINT "permissions_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions_roles" ADD CONSTRAINT "permissions_roles_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id_permission") ON DELETE RESTRICT ON UPDATE CASCADE;
