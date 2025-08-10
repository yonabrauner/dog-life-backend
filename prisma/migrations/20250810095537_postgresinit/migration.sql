-- CreateTable
CREATE TABLE "public"."Dog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Walk" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "walkerName" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Walk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DogActivity" (
    "id" SERIAL NOT NULL,
    "walkId" INTEGER NOT NULL,
    "dogId" INTEGER NOT NULL,
    "pee" BOOLEAN NOT NULL DEFAULT false,
    "poop" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DogActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dog_name_key" ON "public"."Dog"("name");

-- AddForeignKey
ALTER TABLE "public"."DogActivity" ADD CONSTRAINT "DogActivity_walkId_fkey" FOREIGN KEY ("walkId") REFERENCES "public"."Walk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DogActivity" ADD CONSTRAINT "DogActivity_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "public"."Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
