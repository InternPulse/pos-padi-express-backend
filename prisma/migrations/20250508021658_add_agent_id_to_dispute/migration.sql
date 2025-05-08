/*
  Warnings:

  - You are about to alter the column `agent_id` on the `disputes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `disputes` MODIFY `agent_id` VARCHAR(191) NULL;
