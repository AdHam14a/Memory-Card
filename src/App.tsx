import Card from "./Components/Card";
import GameHeader from "./Components/GameHeader";
import WinGame from "./Components/WinGame";
import { useGameLogic } from "./Hooks/useGameLogic";

const cardValues = [
  "🍌",
  "🍎",
  "🍒",
  "🍇",
  "🥝",
  "🍓",
  "🍊",
  "🍑",
  "🍌",
  "🍎",
  "🍒",
  "🍇",
  "🥝",
  "🍓",
  "🍊",
  "🍑",
];

function App() {
  const { scores, moves, initializeCards, winner, cards, handleClicks } =
    useGameLogic(cardValues);

  return (
    <div className="app">
      <GameHeader score={scores} moves={moves} onReset={initializeCards} />
      {winner && <WinGame moves={moves} />}
      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={() => handleClicks(card)} />
        ))}
      </div>
    </div>
  );
}

export default App;
