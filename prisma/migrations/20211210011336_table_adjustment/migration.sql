/*
  Warnings:

  - You are about to drop the column `workload` on the `discipline` table. All the data in the column will be lost.
  - Added the required column `courseLoad` to the `discipline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discipline" DROP COLUMN "workload",
ADD COLUMN     "courseLoad" INTEGER NOT NULL;
