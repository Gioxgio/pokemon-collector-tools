import { Card } from "../model/Card";
import { getFromLocalStorage } from '../services/localStorage';

const probabilityPerPack = (cards: Card[]) => {

    const rates = getFromLocalStorage().rates;
    const cpr = cardsPerRarity(cards);
    const noNewCommon = commonProbability(cpr["C"]);
    const noNewOther = othersProbability(cpr, rates);

    return Math.round((1 - noNewCommon * noNewOther) * 100)
};

const cardsPerRarity = (cards: Card[]) => {

    return cards.reduce((acc, c) => {
        const owned = acc[c.rarityId] || {};
        const countTotal = owned["total"] || 0;
        const count = owned[c.owned + ""] || 0;
        owned[c.owned + ""] = count + 1;
        owned["total"] = countTotal + 1;
        acc[c.rarityId] = owned;
        return acc
    }, {} as { [key: string]: { [key: string]: number } })

};

const commonProbability = (commonCards: { [key: string]: number }) => {

    const total = commonCards["total"];
    const owned = commonCards["true"] || 0;

    return (owned / total) ** 3;
};

const othersProbability = (cards: { [key: string]: { [key: string]: number } }, rates: Map<string, number>) => {

    return Object.keys(cards).reduce((acc, key) => {
        if (key === "C") { return acc; }
        const total = cards[key]["total"];
        const owned = cards[key]["true"] || 0;

        return acc + (owned / total) * (rates.get(key) || 0);
    }, 0) ** 2;
};

export default probabilityPerPack;