import cardsTemplate from "../../scraper/cards.json";
import packsTemplate from "../../scraper/packs.json";
import { Card } from "../model/Card";
import { Pack } from "../model/Pack";

export enum Stores {
    Cards = "cards",
    Packs = "packs"
}

const initItem = <T extends any[]>(store: Stores, data: T) => {
    localStorage.setItem(store, JSON.stringify(data))
    return data;
}

export const getFromLocalStorage = () => {
    const cards = JSON.parse(localStorage.getItem(Stores.Cards) || "null") as Card[] || initItem(Stores.Cards, cardsTemplate);
    const packs = JSON.parse(localStorage.getItem(Stores.Packs) || "null") as Pack[] || initItem(Stores.Packs, packsTemplate);
    return { cards, packs };
}
