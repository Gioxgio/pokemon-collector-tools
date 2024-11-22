import Grid from '@mui/material/Grid2'
import { Card } from './model/Card'
import CardComponent from './Card/CardComponent'
import { useState } from 'react'

function App() {

  const sorter = (a: Card, b: Card) => {
    if (a.owned !== b.owned) { return a.owned ? 1 : -1; }
    return a.id - b.id;
  };
  const handleChange = () => { cards.sort(sorter); setCards([...cards]); };

  const cards_dummy: Card[] = [
    { id: 1, name: "Giorgio", owned: false, imgSrc: "https://img.game8.co/3998332/91c4f79b2b3b4206205bf69db8dd3d1e.png/original" },
    { id: 2, name: "Giorgio", owned: false, imgSrc: "https://img.game8.co/4003548/e62b9303f29d5360acfef5c9a1d8c6d3.png/show" },
    { id: 3, name: "Giorgio", owned: false, imgSrc: "https://img.game8.co/4003548/e62b9303f29d5360acfef5c9a1d8c6d3.png/show" },
    { id: 4, name: "Giorgio", owned: false, imgSrc: "https://img.game8.co/4003548/e62b9303f29d5360acfef5c9a1d8c6d3.png/show" },
    { id: 5, name: "Giorgio", owned: false, imgSrc: "https://img.game8.co/4003548/e62b9303f29d5360acfef5c9a1d8c6d3.png/show" },
    { id: 6, name: "Giorgio", owned: false, imgSrc: "https://img.game8.co/4003548/e62b9303f29d5360acfef5c9a1d8c6d3.png/show" },
    { id: 7, name: "Giorgio", owned: false, imgSrc: "https://img.game8.co/4003548/e62b9303f29d5360acfef5c9a1d8c6d3.png/show" },
    { id: 8, name: "Giorgio", owned: false, imgSrc: "https://img.game8.co/4003548/e62b9303f29d5360acfef5c9a1d8c6d3.png/show" },
    { id: 9, name: "Giorgio", owned: false, imgSrc: "https://img.game8.co/4003548/e62b9303f29d5360acfef5c9a1d8c6d3.png/show" },
  ];

  const [cards, setCards] = useState(cards_dummy);

  return (
    <>
      <p>{cards.map((c) => c.owned ? "owned" : " ").join()}</p>
      <Grid container spacing={0.5} columns={12}>
        {cards.map((card) => (
          <Grid key={card.id} size={2}>
            <CardComponent card={card} callback={handleChange}></CardComponent>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default App;
