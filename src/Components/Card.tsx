import type { CardType } from "../Hooks/useGameLogic";


interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
}

const Card = ({ card, onClick }: CardProps) => {
  return (
    <>
      <div
        className={`card ${card.isFlipped ? "flipped" : ""} ${
          card.isMatched ? "matched" : ""
        }`}
        onClick={() => onClick(card)}
      >
        <div className="card-front">?</div>
        <div className="card-back">{card.value}</div>
      </div>
    </>
  );
};

export default Card;
