/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `RestaurantName` on the `restaurant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restaurantName]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantName` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_categoryName_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_restaurantName_fkey`;

-- DropIndex
DROP INDEX `Item_categoryName_fkey` ON `item`;

-- DropIndex
DROP INDEX `Item_restaurantName_fkey` ON `item`;

-- AlterTable
ALTER TABLE `category` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `restaurant` DROP PRIMARY KEY,
    DROP COLUMN `RestaurantName`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `restaurantName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Restaurant_restaurantName_key` ON `Restaurant`(`restaurantName`);

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_restaurantName_fkey` FOREIGN KEY (`restaurantName`) REFERENCES `Restaurant`(`restaurantName`) ON DELETE CASCADE ON UPDATE CASCADE;
