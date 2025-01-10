import cardsTemplate from "../../scraper/cards.json";
import packs from "../../scraper/packs.json";
import ratesTemplate from "../../scraper/rates.json";
import { Card } from "../model/Card";

export enum Stores {
    Cards = "cards",
}

const getCards = () => {
    return JSON.parse(localStorage.getItem(Stores.Cards) || "null") as Card[];
}

const initItem = <T extends any[]>(store: Stores, data: T) => {
    localStorage.setItem(store, JSON.stringify(data))
    return data;
}

const updateCardsData = () => {

    var cardsLocal = getCards();

    if (cardsLocal === null) {
        initItem(Stores.Cards, cardsTemplate)
    } else {
        (cardsTemplate as Card[]).map((cardT) => {
            const cardL = cardsLocal.find((c) => c.id === cardT.id);
            cardT.owned = cardL?.owned || cardT.owned;
        });
        initItem(Stores.Cards, cardsTemplate)
    }
}

export const getFromLocalStorage = () => {
    updateCardsData();
    const cards = getCards() || cardsTemplate as Card[];
    const rates = new Map<string, number>(Object.entries(ratesTemplate))
    return { cards, packs, rates };
}
