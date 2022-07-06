/*
  Warnings:

  - You are about to drop the column `academicCenterId` on the `class` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `class` table. All the data in the column will be lost.
  - You are about to drop the column `academicCenterId` on the `discipline` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_academicCenterId_fkey";

-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_professorId_fkey";

-- DropForeignKey
ALTER TABLE "discipline" DROP CONSTRAINT "discipline_academicCenterId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_professorId_fkey";

-- DropForeignKey
ALTER TABLE "StudentOnClasses" DROP CONSTRAINT "StudentOnClasses_studentId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_academicCenterId_fkey";

-- DropForeignKey
ALTER TABLE "user_token" DROP CONSTRAINT "user_token_userId_fkey";

-- DropIndex
DROP INDEX "users_academicCenterId_key";

-- DropIndex
DROP INDEX "user_token_userId_key";

-- AlterTable
ALTER TABLE "class" DROP COLUMN "academicCenterId",
DROP COLUMN "professorId";

-- AlterTable
ALTER TABLE "discipline" DROP COLUMN "academicCenterId";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "professorId";

-- DropTable
DROP TABLE "admins";
