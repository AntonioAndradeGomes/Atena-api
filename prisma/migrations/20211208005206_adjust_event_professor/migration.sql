-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_professorId_fkey";

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
