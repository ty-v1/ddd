-- CreateTable
CREATE TABLE `Project` (
    `id` CHAR(26) NOT NULL,
    `title` VARCHAR(256) NOT NULL,
    `description` VARCHAR(512) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
