/*
  Warnings:

  - You are about to drop the `class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `discipline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentOnClasses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_academicCenterId_fkey";

-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_professorId_fkey";

-- DropForeignKey
ALTER TABLE "discipline" DROP CONSTRAINT "discipline_academicCenterId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentOnClasses" DROP CONSTRAINT "StudentOnClasses_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentOnClasses" DROP CONSTRAINT "StudentOnClasses_studentId_fkey";

-- DropForeignKey
ALTER TABLE "user_token" DROP CONSTRAINT "user_token_userId_fkey";

-- DropTable
DROP TABLE "class";

-- DropTable
DROP TABLE "discipline";

-- DropTable
DROP TABLE "StudentOnClasses";

-- DropTable
DROP TABLE "user_token";

-- CreateTable
CREATE TABLE "disciplines" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "initials" TEXT NOT NULL,
    "courseLoad" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "academicCenterId" TEXT,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "isRegularClass" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "academicCenterId" TEXT,
    "professorId" TEXT NOT NULL,
    "dateInitClass" TIMESTAMP(3) NOT NULL,
    "dateEndClass" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_on_classes" (
    "studentId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_on_classes_pkey" PRIMARY KEY ("studentId","classId")
);

-- CreateTable
CREATE TABLE "user_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_code_key" ON "disciplines"("code");

-- CreateIndex
CREATE UNIQUE INDEX "user_tokens_userId_key" ON "user_tokens"("userId");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_academicCenterId_fkey" FOREIGN KEY ("academicCenterId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_academicCenterId_fkey" FOREIGN KEY ("academicCenterId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_on_classes" ADD CONSTRAINT "student_on_classes_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_on_classes" ADD CONSTRAINT "student_on_classes_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
