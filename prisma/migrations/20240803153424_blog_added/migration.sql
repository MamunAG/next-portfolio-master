-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogMaster" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "composedBy" TEXT,
    "composedDate" TIMESTAMP(3),
    "isPublished" BOOLEAN DEFAULT false,

    CONSTRAINT "BlogMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogDetails" (
    "id" SERIAL NOT NULL,
    "masterId" INTEGER NOT NULL,
    "sectionType" TEXT NOT NULL,
    "imagePreview" TEXT,
    "text" TEXT,

    CONSTRAINT "BlogDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogTags" (
    "id" SERIAL NOT NULL,
    "masterId" INTEGER NOT NULL,
    "blogId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "BlogTags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogMaster_title_key" ON "BlogMaster"("title");
