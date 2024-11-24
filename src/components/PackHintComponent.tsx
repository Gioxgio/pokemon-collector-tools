import { Card } from "../model/Card";
import { Pack } from "../model/Pack";

const PackHintComponent = ({ cards, packs }: PackHintComponentProps) => {

    const ownedByPack = cards.filter(card => card.owned)
        .reduce((acc, card) => {
            card.foundInPacks.forEach(
                pid => acc[pid] = (acc[pid] || 0) + 1
            )
            return acc;
        }, {} as Record<string, number>);

    return (
        <>
            <p>{`Unique cards owned: ${cards.filter(card => card.owned).length}`}</p>
            {packs.map(p =>
                <p>{`${p.name}: ${ownedByPack[p.id] || 0}/${p.totalCards} (${ownedByPack[p.id] / p.totalCards * 100 || 0})`}</p>
            )}
        </>
    );
}

export interface PackHintComponentProps {
    cards: Card[],
    packs: Pack[]
}
export default PackHintComponent;