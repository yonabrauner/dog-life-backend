export declare function getAllWalks(): Promise<({
    dogActivities: ({
        dog: {
            name: string;
            picture: string | null;
        };
    } & {
        id: number;
        walkId: number;
        dogId: number;
        pee: boolean;
        poop: boolean;
    })[];
} & {
    id: number;
    date: Date;
    duration: number;
    walkerName: string;
    notes: string | null;
})[]>;
export declare function getLastWalk(): Promise<({
    dogActivities: ({
        dog: {
            id: number;
            name: string;
            picture: string | null;
        };
    } & {
        id: number;
        walkId: number;
        dogId: number;
        pee: boolean;
        poop: boolean;
    })[];
} & {
    id: number;
    date: Date;
    duration: number;
    walkerName: string;
    notes: string | null;
}) | null>;
export declare function getTopWalker(): Promise<{
    walker: string;
    count: number;
} | null>;
export declare function getDogsForWalk(walkId: number): Promise<({
    dog: {
        id: number;
        name: string;
        picture: string | null;
    };
} & {
    id: number;
    walkId: number;
    dogId: number;
    pee: boolean;
    poop: boolean;
})[]>;
export declare function getLastWalkWithActivity(dogName: string, activity: 'poop' | 'pee'): Promise<({
    walk: {
        id: number;
        date: Date;
        duration: number;
        walkerName: string;
        notes: string | null;
    };
} & {
    id: number;
    walkId: number;
    dogId: number;
    pee: boolean;
    poop: boolean;
}) | null>;
export declare function createWalk({ date, duration, walkerName, notes, dogActivities }: {
    date: Date;
    duration: number;
    walkerName: string;
    notes?: string;
    dogActivities: {
        dogName: string;
        pee: boolean;
        poop: boolean;
    }[];
}): Promise<{
    dogActivities: ({
        dog: {
            id: number;
            name: string;
            picture: string | null;
        };
    } & {
        id: number;
        walkId: number;
        dogId: number;
        pee: boolean;
        poop: boolean;
    })[];
} & {
    id: number;
    date: Date;
    duration: number;
    walkerName: string;
    notes: string | null;
}>;
