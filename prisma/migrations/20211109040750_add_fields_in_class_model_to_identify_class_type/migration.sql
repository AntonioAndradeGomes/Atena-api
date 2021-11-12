/*
  Warnings:

  - Added the required column `isExtraClass` to the `class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isRegularClass` to the `class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "class" ADD COLUMN     "isExtraClass" BOOLEAN NOT NULL,
ADD COLUMN     "isRegularClass" BOOLEAN NOT NULL;
