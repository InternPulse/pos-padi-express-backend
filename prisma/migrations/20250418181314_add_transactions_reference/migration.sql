/*
  Warnings:

  - Added the required column `reference` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `reference` VARCHAR(255) NOT NULL;
