/*
  Warnings:

  - You are about to drop the column `user_id` on the `disputes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `disputes` DROP COLUMN `user_id`,
    ADD COLUMN `agent_id` VARCHAR(255) NULL;
