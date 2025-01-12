import LinearProgress from "@mui/material/LinearProgress";
import { Card } from "../model/Card";
import { Pack } from "../model/Pack";
import styles from "../styles/PackSummary.module.css";
import probabilityPerPack from "../services/ProbabilityCalculator";

const PackSummary = ({ cards, pack }: PackSummary) => {

    var owned = 0;

    const packCards = cards.filter((c) => c.foundInPacks.includes(pack.id));
    const prob = probabilityPerPack(packCards);

    const percentage = Math.round(owned / pack.totalCards * 100);

    return (
        <div className={styles.container}>
            <img className={styles.img} alt={pack.name} src={pack.logo}></img>
            <div className={styles.container}>
                <LinearProgress className={styles.linearProgress} style={{ height: '20px' }} variant="determinate" value={percentage} />
                {pack.id.startsWith("AP") && (<p className={styles.percentage}>{`${percentage}%`}</p>)}
                {!pack.id.startsWith("AP") && (<p className={styles.percentage}>{`${percentage}% - ${prob}%`}</p>)}
            </div>
        </div>
    );
}

export interface PackSummary {
    cards: Card[],
    pack: Pack
}
export default PackSummary;