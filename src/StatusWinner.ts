
export enum StatusWinner {
    None = 0,
    Tie = 1,
    Winner = 2,
    WinnerX = Winner,
    WinnerO = Winner | 1
}
