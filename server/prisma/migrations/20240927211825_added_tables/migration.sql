-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_reset_token" TEXT,
    "token_send_at" TIMESTAMP(3),
    "email_verified_at" TIMESTAMP(3),
    "email_verify_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Kalesh" ADD CONSTRAINT "Kalesh_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KaleshItem" ADD CONSTRAINT "KaleshItem_kalesh_id_fkey" FOREIGN KEY ("kalesh_id") REFERENCES "Kalesh"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KaleshComments" ADD CONSTRAINT "KaleshComments_kalesh_id_fkey" FOREIGN KEY ("kalesh_id") REFERENCES "Kalesh"("id") ON DELETE CASCADE ON UPDATE CASCADE;
