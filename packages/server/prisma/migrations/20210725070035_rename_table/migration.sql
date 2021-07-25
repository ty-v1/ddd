/*
  Warnings:

  - You are about to drop the `label` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `label`;

-- CreateTable
CREATE TABLE `Label` (
    `id` CHAR(26) NOT NULL,
    `name` VARCHAR(32) NOT NULL,
    `description` VARCHAR(512) NOT NULL,
    `is_default` BOOLEAN NOT NULL,
    `color` CHAR(7) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
