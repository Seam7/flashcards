/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Add password column as nullable first
ALTER TABLE "User" ADD COLUMN "password" TEXT;

-- Set default password for existing users (hashed "ChangeMe123!")
UPDATE "User" SET "password" = '$2b$10$2YM5nUTEHwixOWZhdeyPkOj.8BO0NLWl.2L4ZhH5g7OqYi7vmdyOi' WHERE "password" IS NULL;

-- Make password NOT NULL
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
