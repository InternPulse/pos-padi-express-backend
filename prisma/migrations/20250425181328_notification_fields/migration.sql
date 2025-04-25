/*
  Warnings:

  - The primary key for the `notifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `deliveredAt` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `readAt` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notifications` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `deliveredAt`,
    DROP COLUMN `readAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `delivered_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `read_at` DATETIME(3) NULL,
    ADD COLUMN `user_id` VARCHAR(255) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
