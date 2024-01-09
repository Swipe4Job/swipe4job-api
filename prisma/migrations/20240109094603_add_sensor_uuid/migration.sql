/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `sensors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `sensors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sensors` ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `sensors_uuid_key` ON `sensors`(`uuid`);
