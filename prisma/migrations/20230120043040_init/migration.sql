/*
  Warnings:

  - Made the column `dateOfBirth` on table `UserInformation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserInformation" ALTER COLUMN "dateOfBirth" SET NOT NULL;
