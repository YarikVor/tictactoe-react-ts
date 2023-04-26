import React from "react";
import { Square } from "./Square";
import { Nullable } from "../Ex/CSharpEx";

export type BoardProps = {
    squares: Nullable<string>[];
    onClick: (num: number) => void;
    indexSelect : number;
};

export class Board extends React.Component<BoardProps> {

    renderSquare(i: number) {
      return (
        <Square 
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          isSelect={this.props.indexSelect === i}
        />
      );
    }
  
    render() {
      let elements: JSX.Element[] = [];
  
      for (let row = 0, index = 0; row < 3; row++) {
        let callsJSX : JSX.Element[] = [];
  
        for (let col = 0; col < 3; col++, index++) {
          callsJSX.push(this.renderSquare(index));
        }
  
        let rowJSX = <div className="board-row">{callsJSX}</div>;
  
        elements.push(rowJSX);
      }
  
      return <div> {elements}</div>;
    }
  }
  