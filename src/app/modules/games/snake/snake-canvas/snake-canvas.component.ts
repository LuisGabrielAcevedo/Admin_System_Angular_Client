import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ISnakeGameConfig, ISnakePosition, ISnakeDirection } from 'src/app/inferfaces/games/snake';
import snakeDirections from './snake-directions';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-snake-canvas',
  templateUrl: './snake-canvas.component.html',
  styleUrls: ['./snake-canvas.component.css']
})
export class SnakeCanvasComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild("snakeCanvas") public snakeCanvas: ElementRef;
  @Output() stop: EventEmitter<any> = new EventEmitter();
  @Input() public snakeGameConfig: ISnakeGameConfig;
  @Input() public isPlaying: boolean;
  public subscriptions: Subscription[] = [];
  public keyPresses: Observable<number>;
  public boardContext: CanvasRenderingContext2D;
  public scores: number = 0;
  public snakePositions: ISnakePosition[];
  public targetCell: ISnakePosition; 
  public snakeDirection: ISnakeDirection = snakeDirections[0];
  constructor() {
    const keyDowns: Observable<Event> = fromEvent(document, 'keydown');
    const keyUps: Observable<Event> = fromEvent(document, 'keyup');
    this.keyPresses = merge(keyUps, keyDowns).pipe(
      filter((event: KeyboardEvent) => [37, 38, 39, 40].includes(event.keyCode)),
      map(event => event.keyCode)
    );
  }

  ngOnInit() {
    this.boardContext = this.snakeCanvas.nativeElement.getContext("2d");
    this.resetSnake();

    this.subscriptions.push(
      this.keyPresses.subscribe(key => {
        const directions = {
          [37]: snakeDirections[0],
          [38]: snakeDirections[1],
          [39]: snakeDirections[2],
          [40]: snakeDirections[3]
        }
        this.snakeDirection = directions[key]
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const isPlaying: boolean = changes.isPlaying ? changes.isPlaying.currentValue : undefined;
    if (isPlaying) {
      this.resetSnake();
      this.scores = 0;
      this.move();
    }
  }

  public boardSizePx(): number {
    return this.snakeGameConfig.boardSize * this.snakeGameConfig.cellSize;
  }

  public resetSnake(): void {
    this.snakePositions = [{
      x: this.getMiddleCell(),
      y: this.getMiddleCell()
    }]
  }

  public getMiddleCell(): number {
    return Math.round(this.snakeGameConfig.boardSize / 2);
  }

  public move() {
    if (!this.isPlaying) return;
    this.clear();
    this.setTargetCell();
    const newHeadCell: ISnakePosition = {
      x: this.snakePositions[0].x + this.snakeDirection.move.x,
      y: this.snakePositions[0].y + this.snakeDirection.move.y,
    }
    if (this.isCellOutOfBoard(newHeadCell) || this.amountCellsInSnake(this.snakePositions[0]) > 1) {
      this.stop.emit();
    } 

    if (this.isTargetNewHead()) {
      this.snakePositions.unshift(this.targetCell);
      this.targetCell = null;
      this.scores += 10;
    } else {
      this.snakePositions.unshift(newHeadCell);
      this.snakePositions.pop();
    }

    this.boardContext.beginPath();
    this.snakePositions.forEach(position => this.drawCell(position));
    this.boardContext.closePath();
    setTimeout(() => this.move(), this.getMoveDelay());

  }

  public drawCell(position: ISnakePosition) {
    this.boardContext.rect(
      position.x * this.snakeGameConfig.cellSize,
      position.y * this.snakeGameConfig.cellSize,
      this.snakeGameConfig.cellSize,
      this.snakeGameConfig.cellSize
    );
    this.boardContext.fillStyle = "black";
    this.boardContext.fill();
  }

  public getMoveDelay(): number {
    return (2 / this.snakeGameConfig.speed) * 1000;
  }

  public clear() {
    this.boardContext.clearRect(
      0,
      0,
      this.boardSizePx(),
      this.boardSizePx()
    );
  }

  public isCellOutOfBoard(position: ISnakePosition) {
    return position.x < 0 || position.y < 0 || position.x >= this.snakeGameConfig.boardSize || position.y >= this.snakeGameConfig.boardSize;
  }

  public setTargetCell() {
    if (!this.targetCell) {
      let targetCell: ISnakePosition = this.getRandomCell()
      while (this.amountCellsInSnake(targetCell) > 0) {
        targetCell = this.getRandomCell();
      }
      this.targetCell = targetCell;
    }

    this.boardContext.beginPath();
    this.boardContext.rect(
      this.targetCell.x * this.snakeGameConfig.cellSize,
      this.targetCell.y * this.snakeGameConfig.cellSize,
      this.snakeGameConfig.cellSize,
      this.snakeGameConfig.cellSize
    )
    this.boardContext.fillStyle = "red";
    this.boardContext.fill();
    this.boardContext.closePath();
  }

  public getRandomCell(): ISnakePosition {
    return {
      x: Math.floor(Math.random() * this.snakeGameConfig.boardSize),
      y: Math.floor(Math.random() * this.snakeGameConfig.boardSize)
    }
  }

  public amountCellsInSnake(position: any) {
    return this.snakePositions.filter(item => item.x === position.x && item.y === position.y).length;
  }

  public isTargetNewHead() {
    return (
      this.snakePositions[0].x + this.snakeDirection.move.x === this.targetCell.x &&
      this.snakePositions[0].y + this.snakeDirection.move.y === this.targetCell.y
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

