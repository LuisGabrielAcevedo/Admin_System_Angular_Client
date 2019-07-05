import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-settings',
  templateUrl: './cart-settings.component.html',
  styleUrls: ['./cart-settings.component.css']
})
export class CartSettingsComponent implements OnInit {
  public items: object[] = [
    { icon: 'view_module' },
    { icon: 'favorite' },
    // { icon: 'loyalty' },
    { icon: 'people' },
    { icon: 'local_atm' }
  ];
  public value = 0;
  constructor() { }

  ngOnInit() {
  }

  changeValue(value: number) {
    this.value = value;
  }

  style(i: number) {
    return {
      'background': `${this.value === i ? '#3f51b5' : ''}`,
      'color': `${this.value !== i ? '#3f51b5 !important' : 'white !important'}`,
      'cursor': 'pointer'
    };
  }

}
