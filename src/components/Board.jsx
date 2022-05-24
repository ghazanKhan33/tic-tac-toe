import React, { useState } from "react";
import Square from "./Square";

function Board() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [X, setX] = useState(true);
  const [hasWon, setHasWon] = useState(false);
  const [isFull, setIsFull]= useState(false)

  function renderSquare(id) {
    return <Square value={square[id]} onClick={() => handleClick(id)} />;
  }
  function handleClick(id) {
    const squares = square.slice();
    let count =0;
    for(let i=0; i<9; i++){
        if(squares[i] !== null)
        count++;        
    }
    if(count>7)
     setIsFull(true)
    
    if (!hasWon && squares[id] === null) {
      squares[id] = X ? "X" : "O";
      setSquare(squares);
      setX(!X);
    }
    if (checkWinner(squares) !== null) {
      setHasWon(true);
    }
  }
  let winner;

  if (checkWinner(square) !== null) {
    winner = checkWinner(square) === "X" ? "Player 1 " : "Player 2";
  }

  let isWon;
  if (winner) {
    isWon = "The Winner is: " + winner;
  } else {
    let status = X ? "Player 1" : "Player 2";
    isWon = "Turn: " + status;
  }

  function checkWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }
    return null;
  }
  function resestHandler() {
    setSquare(Array(9).fill(null));
    setHasWon(false);
    setX(true);
    setIsFull(false)
  }
  return (
    <div>
      <div className="Board">
        {[...Array(9)].map((elem, index) => (
          <div key={index} style={{ opacity: (hasWon || isFull) && "0.5" }}>{renderSquare(index)}</div>
        ))}
      </div>
      <div className="status">
        <h2>{isWon}</h2>
      </div>
      <button
        className="reset"
        onClick={resestHandler}
        style={{ opacity: (hasWon || isFull) ? "1" : "0" }}
      >
        <div>Play Again</div>
      </button>
    </div>
  );
}

export default Board;
