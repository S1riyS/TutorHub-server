-- DropForeignKey
ALTER TABLE "TutorAchievement" DROP CONSTRAINT "TutorAchievement_tutor_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "tutor_details" DROP CONSTRAINT "tutor_details_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "tutor_profiles" DROP CONSTRAINT "tutor_profiles_user_id_fkey";

-- AddForeignKey
ALTER TABLE "tutor_profiles" ADD CONSTRAINT "tutor_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor_details" ADD CONSTRAINT "tutor_details_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "tutor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorAchievement" ADD CONSTRAINT "TutorAchievement_tutor_profile_id_fkey" FOREIGN KEY ("tutor_profile_id") REFERENCES "tutor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
