import { useState } from "react";


export interface CardType {
  id: number;
  value: string | number;
  isFlipped: boolean;
  isMatched: boolean;
}

export type CardValue = string | number;

interface UseGameLogicReturn {
  scores: number;
  moves: number;
  initializeCards: () => void;
  winner: boolean;
  handleClicks: (card: CardType) => void;
  cards: CardType[];
}



export const useGameLogic = (
  cardValues: CardValue[]
): UseGameLogicReturn => {
  
  const shuffleArr = (array: CardValue[]): CardValue[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  
  const createInitialCards = (values: CardValue[]): CardType[] => {
    const shuffled = shuffleArr(values);
    return shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
  };

  const [cards, setCards] = useState<CardType[]>(() =>
    createInitialCards(cardValues)
  );

  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [scores, setScores] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);

  
  const initializeCards = () => {
    setCards(createInitialCards(cardValues));
    setScores(0);
    setMoves(0);
    setFlippedCards([]);
    setMatchedCards([]);
    setIsLocked(false);
  };

  
  const handleClicks = (card: CardType) => {
    if (
      card.isFlipped ||
      card.isMatched ||
      isLocked ||
      flippedCards.length === 2
    ) {
      return;
    }

    
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newlyFlipped = [...flippedCards, card.id];
    setFlippedCards(newlyFlipped);

    
    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]];
      setIsLocked(true);

      if (firstCard.value === card.value) {
        
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScores((prev) => prev + 1);

          setCards((prev) =>
            prev.map((c) =>
              c.id === card.id || c.id === firstCard.id
                ? { ...c, isMatched: true }
                : c
            )
          );

          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        
        setTimeout(() => {
          const flippedBack = newCards.map((c) =>
            newlyFlipped.includes(c.id)
              ? { ...c, isFlipped: false }
              : c
          );

          setCards(flippedBack);
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }
  };


  const winner = matchedCards.length === cardValues.length;

  return { scores, moves, initializeCards, winner, handleClicks, cards };
};
