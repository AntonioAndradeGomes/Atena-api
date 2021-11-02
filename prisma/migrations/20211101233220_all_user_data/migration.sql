/*
  Warnings:

  - You are about to drop the column `type` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isAcademicCenter` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isProfessor` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isStudent` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "type",
ADD COLUMN     "ca_end_date" TIMESTAMP(3),
ADD COLUMN     "ca_init_date" TIMESTAMP(3),
ADD COLUMN     "code" TEXT,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "isAcademicCenter" BOOLEAN NOT NULL,
ADD COLUMN     "isProfessor" BOOLEAN NOT NULL,
ADD COLUMN     "isStudent" BOOLEAN NOT NULL,
ADD COLUMN     "registration" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");
