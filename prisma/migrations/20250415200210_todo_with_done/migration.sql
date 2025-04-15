/*
  Warnings:

  - Added the required column `done` to the `TodoItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TodoItem" ADD COLUMN     "done" BOOLEAN NOT NULL;
