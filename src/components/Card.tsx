import { useState } from "react";
import { Card as CardMoldel } from "../model/Card";
import styles from "../styles/Card.module.css";

type EmptyFunction = () => void;

const Card = ({ card, callback }: CardProps) => {

    const calculateBrightness = () => card.owned ? styles.owned : ""
    const toggle = () => { card.owned = !card.owned, callback(), setBrightness(calculateBrightness()) };

    const [brightness, setBrightness] = useState(calculateBrightness());

    return (
        <img alt={card.name} className={`${styles.img} ${brightness}`} loading="lazy" onClick={() => toggle()} src={card.imgSrc} />
    );
}

export interface CardProps {
    card: CardMoldel,
    callback: EmptyFunction
}
export default Card;