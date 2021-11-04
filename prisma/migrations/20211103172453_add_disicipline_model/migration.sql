-- CreateTable
CREATE TABLE "discipline" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workload" INTEGER NOT NULL,

    CONSTRAINT "discipline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discipline_code_key" ON "discipline"("code");

-- CreateIndex
CREATE UNIQUE INDEX "discipline_name_key" ON "discipline"("name");
