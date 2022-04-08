/*
  Warnings:

  - A unique constraint covering the columns `[auth_user_id]` on the table `students` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "auth_user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "students_auth_user_id_key" ON "students"("auth_user_id");
