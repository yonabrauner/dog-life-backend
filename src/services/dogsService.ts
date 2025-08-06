import { prisma } from "../db.ts";

// Get all walks, with walker and dogs
export async function getAllDogs() {
  return await prisma.dog.findMany({
    orderBy: { id: "asc" },
    include: {
      activities: true,
    }
  });
}