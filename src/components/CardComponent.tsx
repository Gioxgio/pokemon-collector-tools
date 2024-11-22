import { useState } from "react";
import { Card } from "../model/Card";
import "./CardComponent.css";

const CardComponent = ({ card, callback }: CardComponentProps) => {

    const calculateBrightness = () => card.owned ? "owned" : ""
    const toggle = () => { card.owned = !card.owned, callback(), setBrightness(calculateBrightness()) };

    const [brightness, setBrightness] = useState(calculateBrightness());

    return (
        <>
            <img alt={card.name} className={brightness} onClick={() => toggle()} src={card.imgSrc} />
            <p>{card.id}</p>
        </>
    );
}

export interface CardComponentProps {
    card: Card,
    callback: Function
}
export default CardComponent;