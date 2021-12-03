/*
  Warnings:

  - You are about to drop the column `ca_end_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `ca_init_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "ca_end_date",
DROP COLUMN "ca_init_date",
DROP COLUMN "created_at",
DROP COLUMN "updated_at";
