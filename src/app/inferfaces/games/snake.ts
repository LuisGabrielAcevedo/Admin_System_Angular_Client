export interface ISnakeGameConfig {
    cellSize: number;
    boardSize: number;
    speed: number;
}

export interface ISnakePosition {
    x: number;
    y: number
}

export interface ISnakeDirection {
    direction: ESnakeDirections;
    keyCode: number;
    move: ISnakePosition;
}

export enum ESnakeDirections {
    left = 'left',
    right = 'right',
    top = 'top',
    bottom = 'bottom'
}