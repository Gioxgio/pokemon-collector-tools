export interface Card {
    id: string;
    name: string;
    rarityId : "AR" | "C" | "IM" | "R" | "RR" | "SAR" | "SR" | "U" | "UR",
    imgSrc: string;
    pokedexNumber: string ;
    foundInPacks: string[]
    owned: boolean;
}