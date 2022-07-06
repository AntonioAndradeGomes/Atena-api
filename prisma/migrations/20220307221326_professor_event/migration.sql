/*
  Warnings:

  - Added the required column `professorId` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "professorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
