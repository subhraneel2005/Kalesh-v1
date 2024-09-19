-- CreateTable
CREATE TABLE "Kalesh" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "decsription" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "expire_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kalesh_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kalesh" ADD CONSTRAINT "Kalesh_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
