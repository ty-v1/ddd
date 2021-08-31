-- CreateTable
CREATE TABLE `Task` (
    `id` CHAR(26) NOT NULL,
    `name` VARCHAR(256) NOT NULL,
    `description` VARCHAR(5192) NOT NULL,
    `project_id` CHAR(26) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `project`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LabelsOnTasks` (
    `task_id` CHAR(26) NOT NULL,
    `label_id` CHAR(26) NOT NULL,

    PRIMARY KEY (`task_id`, `label_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LabelsOnTasks` ADD FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LabelsOnTasks` ADD FOREIGN KEY (`label_id`) REFERENCES `Label`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
