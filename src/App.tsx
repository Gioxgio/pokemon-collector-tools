import Grid from '@mui/material/Grid2'
import { Card } from './model/Card'
import CardComponent from './components/CardComponent'
import { useState } from 'react'
import { getFromLocalStorage, Stores } from './services/localStorage';
import PackHintComponent from './components/PackHintComponent';

function App() {

  const sorter = (a: Card, b: Card) => {
    if (a.owned !== b.owned) { return a.owned ? 1 : -1; }
    return a.id > b.id ? 1 : -1;
  };
  const handleChange = () => { cards.sort(sorter); setCards([...cards]); localStorage.setItem(Stores.Cards, JSON.stringify(cards)) };

  const localStore = getFromLocalStorage();
  const [cards, setCards] = useState(localStore.cards.sort(sorter));

  return (
    <>
      <PackHintComponent cards={cards} packs={localStore.packs}></PackHintComponent>
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
