-- AlterTable
ALTER TABLE `sensor_data` ADD COLUMN `token_transaction_id` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `sensor_data` ADD CONSTRAINT `sensor_data_token_transaction_id_fkey` FOREIGN KEY (`token_transaction_id`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
