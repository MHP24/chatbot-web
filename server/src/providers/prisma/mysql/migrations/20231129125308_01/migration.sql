/*
  Warnings:

  - You are about to drop the column `data` on the `chats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `chats` DROP COLUMN `data`,
    ADD COLUMN `conversation` JSON NULL;
