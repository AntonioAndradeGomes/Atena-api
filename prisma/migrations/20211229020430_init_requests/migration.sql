-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "isCheck" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);
