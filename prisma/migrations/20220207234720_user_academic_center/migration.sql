/*
  Warnings:

  - A unique constraint covering the columns `[academicCenterId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "academicCenterId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_academicCenterId_key" ON "users"("academicCenterId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_academicCenterId_fkey" FOREIGN KEY ("academicCenterId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
