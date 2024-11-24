import { useState } from "react";
import { Card } from "../model/Card";
import "./CardComponent.css";

type EmptyFunction = () => void;

const CardComponent = ({ card, callback }: CardComponentProps) => {

    const calculateBrightness = () => card.owned ? "owned" : ""
    const toggle = () => { card.owned = !card.owned, callback(), setBrightness(calculateBrightness()) };

    const [brightness, setBrightness] = useState(calculateBrightness());

    return (
        <img alt={card.name} className={brightness} loading="lazy" onClick={() => toggle()} src={card.imgSrc} />
    );
}

export interface CardComponentProps {
    card: Card,
    callback: EmptyFunction
}
export default CardComponent;