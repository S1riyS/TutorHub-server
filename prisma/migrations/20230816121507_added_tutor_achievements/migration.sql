-- CreateEnum
CREATE TYPE "TutorAchievementCategory" AS ENUM ('EDUCATION', 'EXPERIENCE', 'OTHER');

-- CreateTable
CREATE TABLE "TutorAchievement" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "data" TEXT NOT NULL,
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER,
    "category" "TutorAchievementCategory" NOT NULL,
    "attachment_url" TEXT,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TutorAchievement_pkey" PRIMARY KEY ("id")
);
