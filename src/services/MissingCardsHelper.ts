import { Card } from "../model/Card";

type InnerMap = {
    [key: string]: Card[]
};

const isDiscarded = (card: Card) => {
    return card.owned || !card.foundInPacks;
};

const rarityToSymbol = (rarityId: String) => {
    switch (rarityId) {
        case "C": return "♢";
        case "U": return "♢♢";
        case "R": return "♢♢♢";
        case "RR": return "♢♢♢♢";
        case "AR": return "☆";
        case "SR": return "☆☆";
        case "IM": return "☆☆☆";
        case "UR": return "♕";
    }
};

const expansionToString = (rarityId: String) => {
    switch (rarityId) {
        case "A1": return "Genetic Apex";
        case "A1a": return "Mythical Island";
        case "A2": return "Space-Time Smackdown";
        case "A2a": return "Triumphant Light";
    }
};

const getMissingCards = (cards: Card[]): string => {

    let res = "";
    const orderedRarities = ["C", "U", "R", "RR", "AR", "SR", "IM", "UR"];
    const orderedExpansions = ["A1", "A1a", "A2", "A2a"];

    const cardsByRarity = cards
        .filter(card => !isDiscarded(card))
        .reduce((acc, c) => {
            const rarityList = acc[c.rarityId] || [];
            const expansionList = rarityList[c.expansionId] || [];
            expansionList.push(c);
            rarityList[c.expansionId] = expansionList;
            acc[c.rarityId] = rarityList;
            return acc;
        }, {} as { [key: string]: { [key: string]: InnerMap } });

    orderedRarities.forEach(r => {
        res = res.concat(rarityToSymbol(r) + "\n");
        const expansions = cardsByRarity[r];
        orderedExpansions.forEach(e => {
            const cs = expansions[e].map(c => c.name).join(", ");
            res = res.concat("  " + expansionToString(e) + "\n")
            res = res.concat("    " + cs + "\n");
        })
    });

    return res;
};

export default getMissingCards;