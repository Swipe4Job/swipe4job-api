-- CreateTable
CREATE TABLE `api_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reference` VARCHAR(100) NOT NULL,
    `wallet_address` VARCHAR(50) NOT NULL,
    `token` VARCHAR(355) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `config` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(100) NOT NULL DEFAULT '',
    `num_value` INTEGER NULL,
    `text_value` LONGTEXT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `municipalities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL DEFAULT '',
    `ine_code` VARCHAR(100) NOT NULL,
    `coordinates` LONGTEXT NOT NULL DEFAULT '',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `province_id` INTEGER NOT NULL DEFAULT 1,

    INDEX `municipalities_FK`(`province_id`),
    INDEX `municipalities_name_IDX`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provinces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ine_code` VARCHAR(100) NOT NULL DEFAULT '',
    `name` VARCHAR(100) NOT NULL DEFAULT '',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sensor_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sensor_id` INTEGER NOT NULL,
    `battery` DECIMAL(10, 2) NULL,
    `concentration` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `temperature` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `pressure` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `humidity` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `reported_at` DATETIME(0) NOT NULL,
    `hash_data` LONGTEXT NOT NULL DEFAULT '',
    `hash` VARCHAR(255) NOT NULL DEFAULT '',
    `transaction` VARCHAR(255) NOT NULL DEFAULT '',
    `transaction_url` VARCHAR(255) NULL,
    `signature` VARCHAR(255) NULL,
    `chain` VARCHAR(255) NULL,
    `blockchain_dt` DATETIME(0) NULL,
    `blockchain` BOOLEAN NULL DEFAULT false,

    INDEX `sensor_data_FK`(`sensor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sensor_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `group_name` VARCHAR(100) NOT NULL,
    `description` LONGTEXT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `default_group` BOOLEAN NOT NULL DEFAULT false,

    INDEX `sensor_groups_FK`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sensor_models` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reference` VARCHAR(100) NOT NULL DEFAULT '',
    `name` VARCHAR(100) NOT NULL DEFAULT '',
    `schema` LONGTEXT NOT NULL DEFAULT '',
    `description` LONGTEXT NOT NULL DEFAULT '',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `reference`(`reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sensors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coordinates` point NOT NULL DEFAULT (st_geometryfromtext('POINT(0 0)')),
    `name` VARCHAR(100) NOT NULL DEFAULT '',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `device_id` VARCHAR(100) NOT NULL DEFAULT '',
    `municipality_id` INTEGER NOT NULL,
    `model_id` INTEGER NOT NULL DEFAULT 1,
    `group_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `sensors_FK`(`municipality_id`),
    INDEX `sensors_FK_1`(`model_id`),
    INDEX `sensors_FK_group_id`(`group_id`),
    INDEX `sensors_FK_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stats_daily` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` INTEGER NOT NULL,
    `min` DECIMAL(10, 0) NOT NULL,
    `max` DECIMAL(10, 0) NOT NULL,
    `avg` DECIMAL(10, 0) NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `stat_date` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `sensor_id` INTEGER NULL,

    INDEX `stats_daily_FK`(`city`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stats_hourly` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` INTEGER NOT NULL,
    `min` DECIMAL(10, 0) NOT NULL,
    `max` DECIMAL(10, 0) NOT NULL,
    `avg` DECIMAL(10, 0) NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `stat_date` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `sensor_id` INTEGER NULL,

    INDEX `stats_hourly_FK`(`city`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stats_monthly` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` INTEGER NOT NULL,
    `min` DECIMAL(10, 0) NOT NULL,
    `max` DECIMAL(10, 0) NOT NULL,
    `avg` DECIMAL(10, 0) NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `stat_date` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `sensor_id` INTEGER NULL,

    INDEX `stats_monthly_FK`(`city`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wallet_address` VARCHAR(100) NOT NULL DEFAULT '',
    `token` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expiration_date` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wallet_address` VARCHAR(100) NOT NULL DEFAULT '',
    `name` VARCHAR(100) NOT NULL DEFAULT '',
    `email` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(100) NOT NULL,
    `role` VARCHAR(100) NOT NULL,
    `disabled` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `password` VARCHAR(255) NULL,

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `phone_number`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `municipalities` ADD CONSTRAINT `municipalities_FK` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sensor_data` ADD CONSTRAINT `sensor_data_FK` FOREIGN KEY (`sensor_id`) REFERENCES `sensors`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sensor_groups` ADD CONSTRAINT `sensor_groups_FK` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sensors` ADD CONSTRAINT `sensors_FK` FOREIGN KEY (`municipality_id`) REFERENCES `municipalities`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sensors` ADD CONSTRAINT `sensors_FK_1` FOREIGN KEY (`model_id`) REFERENCES `sensor_models`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sensors` ADD CONSTRAINT `sensors_FK_group_id` FOREIGN KEY (`group_id`) REFERENCES `sensor_groups`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sensors` ADD CONSTRAINT `sensors_FK_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `stats_daily` ADD CONSTRAINT `stats_daily_FK` FOREIGN KEY (`city`) REFERENCES `municipalities`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `stats_hourly` ADD CONSTRAINT `stats_hourly_FK` FOREIGN KEY (`city`) REFERENCES `municipalities`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `stats_monthly` ADD CONSTRAINT `stats_monthly_FK` FOREIGN KEY (`city`) REFERENCES `municipalities`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

