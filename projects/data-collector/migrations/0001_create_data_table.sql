-- CreateTable
CREATE TABLE "Data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataType" TEXT NOT NULL DEFAULT 'Unknown',
    "dataId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Data_dataId_key" ON "Data"("dataId");
