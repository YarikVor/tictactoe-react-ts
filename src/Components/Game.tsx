import React from "react";
import { Board } from "./Board";
import { Nullable } from "../Ex/CSharpEx";
import { calculateWinner } from "../Ex/GameEx";
import { StatusWinner } from "../StatusWinner";

export type GameState = {
    history: {
        squares: Nullable<string>[];
        lastPosition: [number, number];
    }[];
    xIsNext: boolean;
    stepNumber: number;
    sorting: boolean;
    indexSelect: number;
};

export class Game extends React.Component<{}, GameState> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    lastPosition: [0, 0],
                },
            ],
            xIsNext: true,
            stepNumber: 0,
            sorting: false,
            indexSelect: -1,
        };
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) !== StatusWinner.None || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    lastPosition: [1 + (i % 3), 1 + Math.floor(i / 3)],
                },
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step & 1) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const stateSymbol = this.state.xIsNext ? "X" : "O";

        const moves = history.map((step, move) => {
            const desc = move
                ? `(${step.lastPosition[0]}; ${step.lastPosition[1]}) - Go to #${move}`
                : "Reset";
            return (
                <li key={move}>
                    <button
                        onClick={() => this.jumpTo(move)}
                        onMouseEnter={() => this.highlight(step.lastPosition[0] - 1 + step.lastPosition[1] * 3 - 3)}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        const sortedMoves = this.state.sorting ? moves.reverse() : moves;

        let status;
        if ((winner & StatusWinner.Winner) !== 0) {
            status = "Victory: " + ((winner === StatusWinner.WinnerX) ? "X" : "O");
        } else if (winner === StatusWinner.Tie) {
            status = "Tie";
        } else {
            status = "Next move: " + stateSymbol;
        }
        console.log(winner.toString());

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        indexSelect={this.state.indexSelect}
                    />
                </div>
                <div className="game-info">
                    <div>
                        {status} {" "}
                        <button
                            onClick={() => this.setState({ sorting: !this.state.sorting })}
                        >
                            Sorting {this.state.sorting ? "🡅" : "🡇"}
                        </button>
                    </div>
                    <ol start={0}>{sortedMoves}</ol>
                </div>
            </div>
        );
    }

    highlight(move: number): void {
        this.setState({ indexSelect: move});
    }
}
