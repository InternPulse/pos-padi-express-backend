-- AlterTable
ALTER TABLE `transactions` MODIFY `description` VARCHAR(255) NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Pending';
