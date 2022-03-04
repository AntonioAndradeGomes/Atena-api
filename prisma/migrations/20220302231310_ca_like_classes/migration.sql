-- AlterTable
ALTER TABLE "class" ADD COLUMN     "academicCenterId" TEXT;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_academicCenterId_fkey" FOREIGN KEY ("academicCenterId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
