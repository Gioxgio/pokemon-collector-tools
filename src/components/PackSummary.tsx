import LinearProgress from "@mui/material/LinearProgress";
import { Card } from "../model/Card";
import { Pack } from "../model/Pack";
import styles from "../styles/PackSummary.module.css";

const PackSummary = ({ cards, pack, rates }: PackSummary) => {

    var owned = 0;
    var prob = 0;

    cards.forEach((card) => {
        if (card.foundInPacks.includes(pack.id)) {
            if (card.owned) {
                owned++;
            } else {
                prob += rates.get(card.rarity.id) || 0
            }
        }
    })

    const percentage = Math.round(owned / pack.totalCards * 100);
    prob = percentage === 0 ? 100 : Math.min(100, Math.round((prob + Number.EPSILON) * 10000) / 100);

    return (
        <div className={styles.container}>
            <img className={styles.img} alt={pack.name} src={pack.logo}></img>
            <div className={styles.container}>
                <LinearProgress className={styles.linearProgress} style={{ height: '20px' }} variant="determinate" value={percentage} />
                <p className={styles.percentage}>{`${percentage}% - ${prob}%`}</p>
            </div>
        </div>
    );
}

export interface PackSummary {
    cards: Card[],
    pack: Pack,
    rates: Map<string, number>
}
export default PackSummary;