/*
  Warnings:

  - Added the required column `company_id` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notifications` ADD COLUMN `company_id` VARCHAR(255) NOT NULL,
    MODIFY `user_id` VARCHAR(255) NULL;
