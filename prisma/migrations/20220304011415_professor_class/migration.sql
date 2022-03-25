/*
  Warnings:

  - Added the required column `professorId` to the `class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "class" ADD COLUMN     "professorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
