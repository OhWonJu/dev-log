/*
  Warnings:

  - You are about to drop the column `count` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `Tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Series` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Series" DROP COLUMN "count";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "count";

-- CreateIndex
CREATE UNIQUE INDEX "Series_name_key" ON "Series"("name");
