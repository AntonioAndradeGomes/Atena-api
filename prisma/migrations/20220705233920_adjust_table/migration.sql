/*
  Warnings:

  - You are about to drop the `student_on_classes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "student_on_classes" DROP CONSTRAINT "student_on_classes_classId_fkey";

-- DropForeignKey
ALTER TABLE "student_on_classes" DROP CONSTRAINT "student_on_classes_studentId_fkey";

-- DropTable
DROP TABLE "student_on_classes";

-- CreateTable
CREATE TABLE "students_on_classes" (
    "studentId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_on_classes_pkey" PRIMARY KEY ("studentId","classId")
);

-- AddForeignKey
ALTER TABLE "students_on_classes" ADD CONSTRAINT "students_on_classes_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students_on_classes" ADD CONSTRAINT "students_on_classes_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
