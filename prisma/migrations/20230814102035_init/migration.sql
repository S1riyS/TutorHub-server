-- CreateEnum
CREATE TYPE "TeachingFormat" AS ENUM ('REMOTELY', 'AT_HOME', 'GOES_TO_STUDENT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TUTOR', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "phone_number" TEXT NOT NULL,
    "image_link" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor_profiles" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "bio" TEXT,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "teachingFormat" "TeachingFormat"[],
    "careerStartYear" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "tutor_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor_education" (
    "id" TEXT NOT NULL,
    "educational_institution_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "graduation_year" INTEGER NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "tutor_profile_id" TEXT,

    CONSTRAINT "tutor_education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor_experience" (
    "id" TEXT NOT NULL,
    "jobName" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "tutor_profile_id" TEXT,

    CONSTRAINT "tutor_experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "grade" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminProfile" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "AdminProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tutor_profiles_user_id_key" ON "tutor_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_user_id_key" ON "StudentProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_user_id_key" ON "AdminProfile"("user_id");

-- AddForeignKey
ALTER TABLE "tutor_profiles" ADD CONSTRAINT "tutor_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor_education" ADD CONSTRAINT "tutor_education_tutor_profile_id_fkey" FOREIGN KEY ("tutor_profile_id") REFERENCES "tutor_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor_experience" ADD CONSTRAINT "tutor_experience_tutor_profile_id_fkey" FOREIGN KEY ("tutor_profile_id") REFERENCES "tutor_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProfile" ADD CONSTRAINT "AdminProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
