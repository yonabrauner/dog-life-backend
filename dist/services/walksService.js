import { prisma } from "../db";
// Get all walks, with walker and dogs
export async function getAllWalks() {
    return await prisma.walk.findMany({
        orderBy: { date: "desc" },
        include: {
            activities: {
                include: { dog: { select: { name: true, picture: true } } }
            }
        }
    });
}
// Get last walk
export async function getLastWalk() {
    return prisma.walk.findFirst({
        orderBy: { date: "desc" },
        where: { date: { lte: new Date() } },
        include: { activities: { include: { dog: true } } }
    });
}
// Get the walker with most walks
export async function getTopWalker() {
    const walkers = await prisma.walk.groupBy({
        by: ["walkerName"],
        _count: { walkerName: true },
        orderBy: { _count: { walkerName: "desc" } },
        take: 1,
    });
    if (!walkers.length)
        return null;
    return walkers[0].walkerName;
}
// Get all dogs that were in a specific walk
export async function getDogsForWalk(walkId) {
    return prisma.dogActivity.findMany({
        where: { walkId },
        include: { dog: true }
    });
}
// Get last walk where (dog) did (activity)
export async function getLastWalkWithActivity(dogName, activity) {
    return prisma.dogActivity.findFirst({
        where: { dog: { name: dogName }, [activity]: true },
        orderBy: { walk: { date: 'desc' } },
        include: { walk: true },
    });
}
// Create a new walk (with activities)
export async function createWalk({ date, duration, walkerName, notes, activities // Array of { dogId, pee, poop }
 }) {
    return prisma.walk.create({
        data: {
            date,
            duration,
            walkerName,
            notes,
            activities: {
                create: activities.map(a => ({
                    dogId: a.dogId,
                    pee: a.pee,
                    poop: a.poop
                }))
            }
        },
        include: { activities: true }
    });
}
