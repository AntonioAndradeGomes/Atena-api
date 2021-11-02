/*
  Warnings:

  - You are about to drop the column `isAcademicCenter` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isProfessor` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isSudent` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "isAcademicCenter",
DROP COLUMN "isProfessor",
DROP COLUMN "isSudent";
