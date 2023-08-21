/*
  Warnings:

  - You are about to drop the column `bio` on the `tutor_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `tutor_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `careerStartYear` on the `tutor_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tutor_profiles" DROP COLUMN "bio",
DROP COLUMN "birth_date",
DROP COLUMN "careerStartYear";

-- CreateTable
CREATE TABLE "tutor_details" (
    "id" TEXT NOT NULL,
    "bio" TEXT,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "careerStartYear" INTEGER NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "tutor_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tutor_details_profile_id_key" ON "tutor_details"("profile_id");

-- AddForeignKey
ALTER TABLE "tutor_details" ADD CONSTRAINT "tutor_details_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "tutor_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
