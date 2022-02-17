/*
  Warnings:

  - You are about to drop the column `academicCenterId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isAcademicCenter` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isProfessor` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isStudent` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STUDENT', 'PROFESSOR', 'ACADEMIC_CENTER');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "academicCenterId",
DROP COLUMN "isAcademicCenter",
DROP COLUMN "isProfessor",
DROP COLUMN "isStudent",
ADD COLUMN     "roles" "Role"[],
ALTER COLUMN "registration" DROP NOT NULL;
