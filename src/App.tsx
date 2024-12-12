import Grid from '@mui/material/Grid2'
import { Card as CardModel } from './model/Card'
import Card from './components/Card'
import { useState } from 'react'
import { getFromLocalStorage, Stores } from './services/localStorage';
import PackSummary from './components/PackSummary';

function App() {

  const sorter = (a: CardModel, b: CardModel) => {
    if (a.owned !== b.owned) { return a.owned ? 1 : -1; }
    return a.id > b.id ? 1 : -1;
  };
  const handleChange = () => { cards.sort(sorter); setCards([...cards]); localStorage.setItem(Stores.Cards, JSON.stringify(cards)) };

  const localStore = getFromLocalStorage();
  const [cards, setCards] = useState(localStore.cards.sort(sorter));
  const packs = localStore.packs;
  const rates = localStore.rates;

  return (
    <>
      <Grid container columns={12} spacing={0.5} display="flex" justifyContent="center" alignItems="center" >
        {packs.map((pack) => (
          <Grid key={pack.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <PackSummary cards={cards} pack={pack} rates={rates}></PackSummary>
          </Grid>
        ))}
      </Grid>
      <p />
      <Grid container columns={12} spacing={0.5} >
        {cards.map((card) => (
          <Grid key={card.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <Card card={card} callback={handleChange}></Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default App;
