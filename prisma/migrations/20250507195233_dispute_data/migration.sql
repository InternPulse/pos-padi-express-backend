-- AlterTable
ALTER TABLE `disputes` ADD COLUMN `account_name` VARCHAR(191) NULL,
    ADD COLUMN `account_number` VARCHAR(191) NULL,
    ADD COLUMN `bank_name` VARCHAR(191) NULL,
    ADD COLUMN `reason` VARCHAR(191) NULL;
