export interface Card {
    id: string;
    name: string;
    rarityId: "AR" | "C" | "IM" | "R" | "RR" | "SR" | "U" | "UR",
    imgSrc: string;
    pokedexNumber: string;
    foundInPacks: string[]
    expansionId: string;
    number: number;
    owned: boolean;
}