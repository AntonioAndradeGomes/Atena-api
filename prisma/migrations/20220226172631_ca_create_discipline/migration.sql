-- AlterTable
ALTER TABLE "discipline" ADD COLUMN     "academicCenterId" TEXT;

-- AddForeignKey
ALTER TABLE "discipline" ADD CONSTRAINT "discipline_academicCenterId_fkey" FOREIGN KEY ("academicCenterId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
