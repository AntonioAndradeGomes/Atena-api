/*
  Warnings:

  - You are about to drop the `requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "requests";

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "isCheck" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
