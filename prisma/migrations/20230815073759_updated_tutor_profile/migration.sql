/*
  Warnings:

  - You are about to drop the column `teachingFormat` on the `tutor_profiles` table. All the data in the column will be lost.
  - Changed the type of `careerStartYear` on the `tutor_profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tutor_profiles" DROP COLUMN "teachingFormat",
ADD COLUMN     "teachingFormats" "TeachingFormat"[],
DROP COLUMN "careerStartYear",
ADD COLUMN     "careerStartYear" INTEGER NOT NULL;
