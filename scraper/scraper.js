import fs from "fs";

async function scrapeCards() {

    const BASE_URL = "https://pocket.codex.gg/api/cards/"
    const response = await fetch(BASE_URL + "search");
    const initialData = await response.json();

    const cardsUberJson = [];
    const packsUberJson = [
        {
            id: "AN001_0010_00_000",
            logo: "/public/assets/mewtwo.png",
            name: "Genetic Apex: Mewtwo",
            totalCards: 0
        },
        {
            id: "AN001_0020_00_000",
            logo: "/public/assets/charizard.png",
            name: "Genetic Apex: Charizard",
            totalCards: 0
        },
        {
            id: "AN001_0030_00_000",
            logo: "/public/assets/pikachu.png",
            name: "Genetic Apex: Pikachu",
            totalCards: 0
        },
        {
            id: "AP001_0010_00_000",
            logo: "/public/assets/promo-a-1.png",
            name: "Promo Pack A Series Vol. 1",
            totalCards: 0
        },
        {
            id: "AP001_0020_00_000",
            logo: "/public/assets/promo-a.png",
            name: "Promo Pack A Series Vol. 2",
            totalCards: 0
        }
    ];

    for (const card of initialData.data.results) {

        const cardUrl = BASE_URL + "keys/?keys=" + card.cardDefKey;
        const cardResponse = await fetch(cardUrl);
        const cardJson = await cardResponse.json();
        const cardData = cardJson.data[0];

        const transformedCard = {
            id: cardData.externalId,
            name: cardData.name,
            description: cardData.description,
            type: cardData.type,
            series: cardData.series,
            rarity: {
                id: cardData.rarity,
                name: cardData.rarityName
            },
            imgSrc: cardData.displayImageUrl,
            expansion: {
                id: cardData.expansionKey,
                name: cardData.expansionName
            },
            types: cardData.types,
            dustCost: cardData.dustCost,
            collectionNumber: cardData.collectionNumber,
            artists: cardData.artists,
            variants: cardData.variants?.map(v => v.externalId),
            foundInPacks: [...new Set(cardData.foundInPacks)],
            hp: cardData.hp,
            abilities: cardData.abilities,
            owned: false
        };

        console.log("Downloaded ", transformedCard.name)

        const originalFilename = `original/${card.cardDefKey}.json`;
        fs.writeFileSync(originalFilename, JSON.stringify(cardData, null, 2));
        const transformedFilename = `transformed/${card.cardDefKey}.json`
        fs.writeFileSync(transformedFilename, JSON.stringify(transformedCard, null, 2));
        console.log("Saved card data");

        cardsUberJson.push(transformedCard);

        transformedCard.foundInPacks.forEach((pid) => {
            packsUberJson.filter(p => p.id == pid)[0].totalCards++;
        });

        if (!cardResponse.ok) {
            console.error(`Error fetching card data for ${card.name}`);
        }
    }

    const cardsFilename = `cards.json`;
    fs.writeFileSync(cardsFilename, JSON.stringify(cardsUberJson, null, 2));
    const packsFilename = `packs.json`;
    fs.writeFileSync(packsFilename, JSON.stringify(packsUberJson, null, 2));
}

scrapeCards();