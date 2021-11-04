/*
  Warnings:

  - Added the required column `initials` to the `discipline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discipline" ADD COLUMN     "initials" TEXT NOT NULL;
