export declare function getAllDogs(): Promise<({
    activities: {
        id: number;
        walkId: number;
        dogId: number;
        pee: boolean;
        poop: boolean;
    }[];
} & {
    id: number;
    name: string;
    picture: string | null;
})[]>;
