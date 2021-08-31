/*
  Warnings:

  - Added the required column `project_id` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Label` ADD COLUMN `project_id` CHAR(26) NOT NULL;

-- CreateIndex
CREATE INDEX `project` ON `Label`(`project_id`);

-- AddForeignKey
ALTER TABLE `Label` ADD FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
