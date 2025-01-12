import fs from "fs";

async function scrapeCards() {

    const BASE_URL = "https://www.pokemon-zone.com/api/game/game-data"
    const response = await fetch(BASE_URL);
    const initialData = await response.json();

    const mappedPacks = initialData.data.packs.map((pack) => {
        const totalCards = initialData.data.packCardIds.find((p) => p.packId == pack.packId).cardIds.length;
        return {
            id: pack.packId,
            logo: pack.assetUrl,
            name: pack.description,
            totalCards: totalCards
        }
    });

    const mappedCards = initialData.data.cards.map((card) => {
        return {
            id: card.cardId,
            name: card.name,
            rarityId: card.rarity === "SAR" ? "SR" : card.rarity,
            imgSrc: card.illustrationUrl,
            pokedexNumber: card.pokemon?.pokedexNumber,
            foundInPacks: [...new Set(card.foundInPacks)],
            owned: false
        };
    });

    const cardsFilename = `cards.json`;
    fs.writeFileSync(cardsFilename, JSON.stringify(mappedCards));
    const packsFilename = `packs.json`;
    fs.writeFileSync(packsFilename, JSON.stringify(mappedPacks));
}

scrapeCards();