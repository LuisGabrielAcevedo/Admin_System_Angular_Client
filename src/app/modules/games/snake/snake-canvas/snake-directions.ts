import { ISnakeDirection, ESnakeDirections } from "src/app/inferfaces/games/snake";

const snakeDirections: ISnakeDirection[] = [
    {
        direction: ESnakeDirections.left,
        keyCode: 37,
        move: {
            x: -1,
            y: 0
        }
    },
    {
        direction: ESnakeDirections.top,
        keyCode: 38,
        move: {
            x: 0,
            y: -1
        }
    },
    {
        direction: ESnakeDirections.right,
        keyCode: 39,
        move: {
            x: 1,
            y: 0
        }
    },
    {
        direction: ESnakeDirections.top,
        keyCode: 40,
        move: {
            x: 0,
            y: 1
        }
    },
];

export default snakeDirections;