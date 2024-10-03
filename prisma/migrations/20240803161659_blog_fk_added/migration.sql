/*
  Warnings:

  - You are about to drop the column `composedBy` on the `BlogMaster` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogMaster" DROP COLUMN "composedBy",
ADD COLUMN     "composedById" INTEGER;

-- AddForeignKey
ALTER TABLE "BlogMaster" ADD CONSTRAINT "BlogMaster_composedById_fkey" FOREIGN KEY ("composedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogDetails" ADD CONSTRAINT "BlogDetails_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "BlogMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTags" ADD CONSTRAINT "BlogTags_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "BlogMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTags" ADD CONSTRAINT "BlogTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
