-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "CIF" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "companySize" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_CIF_key" ON "companies"("CIF");
