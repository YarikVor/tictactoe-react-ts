import { MouseEventHandler} from "react";
import { Nullable } from "../Ex/CSharpEx";

export type SquareProps = {
    value: Nullable<string>;
    onClick: MouseEventHandler<HTMLButtonElement>;
    isSelect: boolean;
};

export const Square = (props: SquareProps) => {
    return <button className={`square ${props.isSelect ? "active" : ""}`} onClick={props.onClick}>
        {props.value}
    </button>
};

