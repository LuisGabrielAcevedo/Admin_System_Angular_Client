import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quantity-select',
  templateUrl: './quantity-select.component.html',
  styleUrls: ['./quantity-select.component.css']
})
export class QuantitySelectComponent implements OnInit {
  public buttons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor() { }

  ngOnInit() {
  }

}
