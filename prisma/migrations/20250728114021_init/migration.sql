-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Walk" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "walkerId" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Walk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalkDog" (
    "id" SERIAL NOT NULL,
    "walkId" INTEGER NOT NULL,
    "dogId" INTEGER NOT NULL,

    CONSTRAINT "WalkDog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DogActivity" (
    "id" SERIAL NOT NULL,
    "walkId" INTEGER NOT NULL,
    "dogId" INTEGER NOT NULL,
    "pee" BOOLEAN NOT NULL DEFAULT false,
    "poop" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DogActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dog_name_key" ON "Dog"("name");

-- AddForeignKey
ALTER TABLE "Walk" ADD CONSTRAINT "Walk_walkerId_fkey" FOREIGN KEY ("walkerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalkDog" ADD CONSTRAINT "WalkDog_walkId_fkey" FOREIGN KEY ("walkId") REFERENCES "Walk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalkDog" ADD CONSTRAINT "WalkDog_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DogActivity" ADD CONSTRAINT "DogActivity_walkId_fkey" FOREIGN KEY ("walkId") REFERENCES "Walk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DogActivity" ADD CONSTRAINT "DogActivity_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
