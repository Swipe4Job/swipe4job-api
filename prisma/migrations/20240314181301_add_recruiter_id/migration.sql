-- CreateTable
CREATE TABLE "offers" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "responsabilities" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "contractType" TEXT NOT NULL,
    "workingDay" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "salaryRange" TEXT NOT NULL,
    "workingHours" TEXT NOT NULL,
    "departmentOrganization" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "recruiterId" TEXT NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
