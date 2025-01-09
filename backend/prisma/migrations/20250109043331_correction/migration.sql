/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `restaurantId` on the `item` table. All the data in the column will be lost.
  - The primary key for the `restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `restaurant` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantName` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_restaurantId_fkey`;

-- DropIndex
DROP INDEX `Category_name_key` ON `category`;

-- DropIndex
DROP INDEX `Item_categoryId_fkey` ON `item`;

-- DropIndex
DROP INDEX `Item_restaurantId_fkey` ON `item`;

-- AlterTable
ALTER TABLE `category` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- AlterTable
ALTER TABLE `item` DROP COLUMN `categoryId`,
    DROP COLUMN `restaurantId`,
    ADD COLUMN `categoryName` VARCHAR(191) NOT NULL,
    ADD COLUMN `restaurantName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `restaurant` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`RestaurantName`);

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_restaurantName_fkey` FOREIGN KEY (`restaurantName`) REFERENCES `Restaurant`(`RestaurantName`) ON DELETE RESTRICT ON UPDATE CASCADE;
