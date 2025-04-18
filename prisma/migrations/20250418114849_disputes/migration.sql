-- CreateTable
CREATE TABLE `Disputes` (
    `id` VARCHAR(191) NOT NULL,
    `transaction_id` VARCHAR(255) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    `resolution_notes` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Disputes_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
