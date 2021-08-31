-- CreateTable
CREATE TABLE `TaskHistory` (
    `id` INTEGER NOT NULL,
    `state` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `task_id` CHAR(26) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskHistory` ADD FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
