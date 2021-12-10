/*
  Warnings:

  - Added the required column `disciplineId` to the `class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "class" ADD COLUMN     "disciplineId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
