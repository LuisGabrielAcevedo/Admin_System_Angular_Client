import { Component, OnInit, ViewChild } from "@angular/core";
import { FormField } from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";
import snakeFields from "src/app/metadata/games/form/snake";
import { DynamicFormComponent } from "src/app/modules/shared-modules/dynamic-form/dynamic-form.component";
import { ISnakeGameConfig } from "src/app/inferfaces/games/snake";

@Component({
  selector: "app-snake",
  templateUrl: "./snake.component.html",
  styleUrls: ["./snake.component.css"]
})
export class SnakeComponent implements OnInit {
  @ViewChild("snakeDynamicForm") public snakeForm: DynamicFormComponent;
  public title: string = "Snake";
  public fieldsConfig: FormField[] = snakeFields;
  public snakeGameConfig: ISnakeGameConfig = {
    speed: 0,
    boardSize: 30,
    cellSize: 10
  };
  public isPlaying: boolean = false;
  constructor() {}

  ngOnInit() {}

  public start(): void {
    this.snakeForm.submit().subscribe(data => {
      if (data.valid) {
        this.snakeGameConfig = {
          ...this.snakeGameConfig,
          ...data.currentModel
        };
        this.isPlaying = true;
      }
    });
  }

  public stop(): void {
    this.isPlaying = false;
  }
}
