import Grid from '@mui/material/Grid2'
import { Card as CardModel } from './model/Card'
import Card from './components/Card'
import { useState } from 'react'
import { getFromLocalStorage, Stores } from './services/localStorage';
import PackSummary from './components/PackSummary';
import getMissingCards from './services/MissingCardsHelper';
import { Fab } from '@mui/material';
import styles from "./styles/App.module.css";

function App() {

  const sorter = (a: CardModel, b: CardModel) => {
    if (a.owned !== b.owned) { return a.owned ? 1 : -1; }
    if (a.expansionId > b.expansionId) { return 1; }
    if (a.expansionId < b.expansionId) { return -1; }
    return (a.number > b.number) ? 1 : -1;
  };

  const localStore = getFromLocalStorage();
  const [cards, setCards] = useState(localStore.cards.sort(sorter));
  const packs = localStore.packs;

  const handleChange = () => { cards.sort(sorter); setCards([...cards]); localStorage.setItem(Stores.Cards, JSON.stringify(cards)) };
  const copyCards = async () => {
    const mc = getMissingCards(cards);
    await window.navigator.clipboard.writeText(mc);
    alert("Missing cards copied to clipboard!");
  }

  return (
    <>
      <Grid container columns={12} spacing={0.5} display="flex" justifyContent="center" alignItems="center" >
        {packs.map((pack) => (
          <Grid key={pack.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <PackSummary cards={cards} pack={pack}></PackSummary>
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
      <div className={styles.fixedButton}>
        <Fab color="primary" onClick={copyCards}>📋</Fab>
      </div>
    </>
  );
}

export default App;
