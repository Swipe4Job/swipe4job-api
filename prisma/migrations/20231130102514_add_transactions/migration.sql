-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(191) NOT NULL,
    `destination_wallet` VARCHAR(191) NOT NULL,
    `tokens` INTEGER NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `state` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
