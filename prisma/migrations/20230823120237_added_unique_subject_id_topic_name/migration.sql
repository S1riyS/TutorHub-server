/*
  Warnings:

  - A unique constraint covering the columns `[subjectId,nameForURL]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Topic_subjectId_nameForURL_key" ON "Topic"("subjectId", "nameForURL");
