-- CreateTable
CREATE TABLE "KaleshItem" (
    "id" SERIAL NOT NULL,
    "kalesh_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KaleshItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KaleshComments" (
    "id" SERIAL NOT NULL,
    "kalesh_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KaleshComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KaleshItem" ADD CONSTRAINT "KaleshItem_kalesh_id_fkey" FOREIGN KEY ("kalesh_id") REFERENCES "Kalesh"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KaleshComments" ADD CONSTRAINT "KaleshComments_kalesh_id_fkey" FOREIGN KEY ("kalesh_id") REFERENCES "Kalesh"("id") ON DELETE CASCADE ON UPDATE CASCADE;
