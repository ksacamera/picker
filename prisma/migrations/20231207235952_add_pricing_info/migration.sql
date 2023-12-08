-- CreateTable
CREATE TABLE "Price" (
    "PriceID" SERIAL NOT NULL,
    "store" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "url" TEXT NOT NULL,
    "ModelID" INTEGER NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("PriceID")
);

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_ModelID_fkey" FOREIGN KEY ("ModelID") REFERENCES "Model"("ModelID") ON DELETE RESTRICT ON UPDATE CASCADE;
