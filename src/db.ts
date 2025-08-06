import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Optional: Log connection success (for debugging)
prisma.$connect()
  .then(() => console.log("Connected to PostgreSQL via Prisma"))
  .catch((err) => console.error("Prisma connection error:", err));