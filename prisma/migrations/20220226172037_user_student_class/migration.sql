/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `user_token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_token_userId_key" ON "user_token"("userId");

-- AddForeignKey
ALTER TABLE "StudentOnClasses" ADD CONSTRAINT "StudentOnClasses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_token" ADD CONSTRAINT "user_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
