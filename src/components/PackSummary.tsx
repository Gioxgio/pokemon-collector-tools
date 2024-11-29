import LinearProgress from "@mui/material/LinearProgress";
import { Card } from "../model/Card";
import { Pack } from "../model/Pack";
import styles from "../styles/PackSummary.module.css";

const PackSummary = ({ cards, pack }: PackSummary) => {

    const owned = cards.reduce((acc, card) => {
        if (card.owned && card.foundInPacks.includes(pack.id)) {
            acc++;
        }
        return acc;
    }, 0);
    const percentage = Math.round(owned / pack.totalCards * 100);

    return (
        <div className={styles.container}>
            <img className={styles.img} alt={pack.name} src={pack.logo}></img>
            <div className={styles.container}>
                <LinearProgress className={styles.linearProgress} style={{ height: '20px' }} variant="determinate" value={percentage} />
                <p className={styles.percentage}>{`${percentage}%`}</p>
            </div>
        </div>
    );
}

export interface PackSummary {
    cards: Card[],
    pack: Pack
}
export default PackSummary;