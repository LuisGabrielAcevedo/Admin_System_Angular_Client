import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public flipDiv: boolean = false;
  @Input() public product: any;
  constructor() { }

  ngOnInit() {
  }

  public setFlipStatus() {
    this.flipDiv = !this.flipDiv;
  }
}
