-- AlterTable
ALTER TABLE "TutorAchievement" ADD COLUMN     "tutor_profile_id" TEXT;

-- AddForeignKey
ALTER TABLE "TutorAchievement" ADD CONSTRAINT "TutorAchievement_tutor_profile_id_fkey" FOREIGN KEY ("tutor_profile_id") REFERENCES "tutor_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
