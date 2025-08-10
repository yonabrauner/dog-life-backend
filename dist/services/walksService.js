import { prisma } from "../db.js";
// Get all walks, with walker and dogs
export async function getAllWalks() {
    return await prisma.walk.findMany({
        orderBy: { date: "desc" },
        include: {
            dogActivities: {
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
        include: { dogActivities: { include: { dog: true } } }
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
    return {
        walker: walkers[0].walkerName,
        count: walkers[0]._count.walkerName
    };
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
export async function createWalk({ date, duration, walkerName, notes, dogActivities // Array of { dogName, pee, poop }
 }) {
    const finalDogActivities = await Promise.all(dogActivities.map(async (activity) => {
        let dog = await prisma.dog.findUnique({
            where: { name: activity.dogName } // optionally include userId here
        });
        if (!dog) {
            dog = await prisma.dog.create({
                data: { name: activity.dogName } // include userId if relevant
            });
        }
        return {
            dogId: dog.id,
            poop: activity.poop,
            pee: activity.pee
        };
    }));
    try {
        return prisma.walk.create({
            data: {
                date,
                duration,
                walkerName,
                notes,
                dogActivities: {
                    create: finalDogActivities
                }
            },
            include: { dogActivities: { include: { dog: true } } }
        });
    }
    catch (err) {
        console.error("failed to create walk: ", err);
        throw err;
    }
}
