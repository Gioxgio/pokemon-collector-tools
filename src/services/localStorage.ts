import cardsTemplate from "../../scraper/cards.json";
import packsTemplate from "../../scraper/packs.json";
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
        (cardsTemplate as Card[]).forEach((cardT) => {
            const cardL = cardsLocal.find((c) => c.id === cardT.id);
            if (cardL === undefined) {
                cardsLocal.push(cardT)
            } else {
                cardL.imgSrc = cardT.imgSrc;
            }
        });
        const templateIds = cardsTemplate.map(c => c.id);
        cardsLocal = cardsLocal.filter((cardsL) => templateIds.includes(cardsL.id))
        initItem(Stores.Cards, cardsLocal)
    }
}

export const getFromLocalStorage = () => {
    updateCardsData();
    const cards = JSON.parse(localStorage.getItem(Stores.Cards) || "null") as Card[] || cardsTemplate as Card[];
    const packs = packsTemplate;
    return { cards, packs };
}
