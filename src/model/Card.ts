export interface Card {
    id: number;
    name: string;
    description: string,
    type: "Fossil" | "Item" | "Pokemon" | "Supporter",
    series: "A",
    rarity: {
        id: "AR" | "C" | "IM" | "R" | "RR" | "SAR" | "SR" | "U" | "UR",
        name: "Art Rare" | "Common" | "Immersive Rare" | "Rare" | "Double Rare" | "Special Art Rare" | "Super Rare" | "Uncommon" | "Crown Rare",
    },
    imgSrc: string;
    expansion: {
        id: "A1" | "PROMO-A"
        name: "Genetic Apex" | "Promo A"
    },
    types: string[],
    dustCost: number,
    collectionNumber: number,
    artists: [
        {
            id: number
            name: string,
        }
    ],
    variants: string[],
    foundInPacks: string[]
    owned: boolean;
}