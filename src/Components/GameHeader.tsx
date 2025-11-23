interface GameHeaderProps {
  score: number;
  moves: number;
  onReset: () => void;
}

const GameHeader = ({ score, moves, onReset }: GameHeaderProps) => {
  return (
    <>
      <div className="game-header">
        <h1>🎯 Memory Card Game</h1>
        <div>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Score:</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Moves:</span>
              <span className="stat-value">{moves}</span>
            </div>
          </div>
        </div>
        <button className="reset-btn" onClick={onReset}>
          🔄️ Reset
        </button>
      </div>
    </>
  );
};

export default GameHeader;
