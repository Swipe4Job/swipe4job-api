/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `municipalities` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `municipalities` ALTER COLUMN `uuid` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `municipalities_uuid_key` ON `municipalities`(`uuid`);
