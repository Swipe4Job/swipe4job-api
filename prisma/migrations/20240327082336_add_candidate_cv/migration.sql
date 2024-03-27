-- CreateTable
CREATE TABLE "CandidateCV" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "studies" TEXT NOT NULL,
    "softSkills" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "languages" TEXT NOT NULL,
    "jobExperiences" TEXT NOT NULL,

    CONSTRAINT "CandidateCV_pkey" PRIMARY KEY ("id")
);
