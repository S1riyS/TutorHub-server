/*
  Warnings:

  - A unique constraint covering the columns `[nameForURL]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameForURL` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameForURL` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "nameForURL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "nameForURL" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subject_nameForURL_key" ON "Subject"("nameForURL");
