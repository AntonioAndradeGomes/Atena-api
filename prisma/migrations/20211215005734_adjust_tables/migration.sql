/*
  Warnings:

  - Added the required column `updatedAt` to the `AccessCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StudentOnClasses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccessCode" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "StudentOnClasses" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
