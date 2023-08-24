/*
  Warnings:

  - You are about to drop the column `nameForURL` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `nameForURL` on the `Topic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subjectId,name]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Subject_nameForURL_key";

-- DropIndex
DROP INDEX "Topic_subjectId_nameForURL_key";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "nameForURL";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "nameForURL";

-- CreateIndex
CREATE UNIQUE INDEX "Topic_subjectId_name_key" ON "Topic"("subjectId", "name");
