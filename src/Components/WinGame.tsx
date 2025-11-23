interface WinGameProps {
  moves: number;
}

const WinGame = ({ moves }:WinGameProps) => {
  return (
      <>
          <div className="win-message">
              <h2>Congratulations !</h2>
              <p>You have won in {moves} moves</p>
        </div>
      </>
  )
}

export default WinGame