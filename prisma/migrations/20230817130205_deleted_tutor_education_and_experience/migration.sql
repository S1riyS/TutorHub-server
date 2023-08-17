/*
  Warnings:

  - You are about to drop the `tutor_education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tutor_experience` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tutor_education" DROP CONSTRAINT "tutor_education_tutor_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "tutor_experience" DROP CONSTRAINT "tutor_experience_tutor_profile_id_fkey";

-- DropTable
DROP TABLE "tutor_education";

-- DropTable
DROP TABLE "tutor_experience";
