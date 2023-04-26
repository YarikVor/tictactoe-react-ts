import { StatusWinner } from "../StatusWinner";
import { Nullable } from "./CSharpEx";

export function calculateWinner(squares: Nullable<string>[]) : StatusWinner {
  const lines: [number, number, number][] = [
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] === "X"
        ? StatusWinner.WinnerX
        : StatusWinner.WinnerO;
    }
  }

  if (!squares.some((el) => el === null)){
    return StatusWinner.Tie;
  }

  return StatusWinner.None;
}


