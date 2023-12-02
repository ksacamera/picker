-- CreateTable
CREATE TABLE "Brand" (
    "BrandID" SERIAL NOT NULL,
    "BrandName" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("BrandID")
);

-- CreateTable
CREATE TABLE "Texture" (
    "TextureID" SERIAL NOT NULL,
    "TextureName" TEXT NOT NULL,

    CONSTRAINT "Texture_pkey" PRIMARY KEY ("TextureID")
);

-- CreateTable
CREATE TABLE "Hand" (
    "HandID" SERIAL NOT NULL,
    "HandName" TEXT NOT NULL,

    CONSTRAINT "Hand_pkey" PRIMARY KEY ("HandID")
);

-- CreateTable
CREATE TABLE "KickPoint" (
    "KickPointID" SERIAL NOT NULL,
    "KickPointName" TEXT NOT NULL,

    CONSTRAINT "KickPoint_pkey" PRIMARY KEY ("KickPointID")
);

-- CreateTable
CREATE TABLE "Flex" (
    "FlexID" SERIAL NOT NULL,
    "FlexValue" INTEGER NOT NULL,

    CONSTRAINT "Flex_pkey" PRIMARY KEY ("FlexID")
);

-- CreateTable
CREATE TABLE "BladeCurve" (
    "BladeCurveID" SERIAL NOT NULL,
    "BladeCurveName" TEXT NOT NULL,
    "BladeCurveType" TEXT NOT NULL,
    "BladeCurveToe" TEXT NOT NULL,
    "BladeCurveFace" TEXT NOT NULL,
    "BladeCurveLength" TEXT NOT NULL,
    "BladeCurveLie" DOUBLE PRECISION NOT NULL,
    "BrandID" INTEGER NOT NULL DEFAULT 1,
    "BrandName" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "BladeCurve_pkey" PRIMARY KEY ("BladeCurveID")
);

-- CreateTable
CREATE TABLE "Model" (
    "ModelID" SERIAL NOT NULL,
    "ModelName" TEXT NOT NULL,
    "BrandID" INTEGER NOT NULL,
    "KickPointID" INTEGER NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("ModelID")
);

-- CreateTable
CREATE TABLE "Variant" (
    "ModelVariantID" SERIAL NOT NULL,
    "ModelID" INTEGER NOT NULL,
    "FlexID" INTEGER NOT NULL,
    "HandID" INTEGER NOT NULL,
    "BladeCurveID" INTEGER NOT NULL,
    "TextureID" INTEGER NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("ModelVariantID")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "BladeCurve" ADD CONSTRAINT "BladeCurve_BrandID_fkey" FOREIGN KEY ("BrandID") REFERENCES "Brand"("BrandID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_BrandID_fkey" FOREIGN KEY ("BrandID") REFERENCES "Brand"("BrandID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_KickPointID_fkey" FOREIGN KEY ("KickPointID") REFERENCES "KickPoint"("KickPointID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_ModelID_fkey" FOREIGN KEY ("ModelID") REFERENCES "Model"("ModelID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_FlexID_fkey" FOREIGN KEY ("FlexID") REFERENCES "Flex"("FlexID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_HandID_fkey" FOREIGN KEY ("HandID") REFERENCES "Hand"("HandID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_BladeCurveID_fkey" FOREIGN KEY ("BladeCurveID") REFERENCES "BladeCurve"("BladeCurveID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_TextureID_fkey" FOREIGN KEY ("TextureID") REFERENCES "Texture"("TextureID") ON DELETE RESTRICT ON UPDATE CASCADE;
