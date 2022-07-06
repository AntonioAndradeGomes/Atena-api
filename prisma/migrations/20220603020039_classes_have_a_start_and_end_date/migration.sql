/*
  Warnings:

  - Added the required column `dateEndClass` to the `class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateInitClass` to the `class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "class" ADD COLUMN     "dateEndClass" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateInitClass" TIMESTAMP(3) NOT NULL;
