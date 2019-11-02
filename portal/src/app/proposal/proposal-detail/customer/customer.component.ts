import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Address, Customer, Spouse } from '@app/proposal/api/proposal';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnChanges {
  @Input() customer: Customer;

  public address: Address;
  public addressDni: Address;
  public spouse: Spouse;

  public noData = '-';

  constructor() {}

  ngOnChanges() {
    if (!this.customer) return;
    this.address = this.customer.address;
    this.addressDni = this.customer.addressDni;
    this.spouse = this.customer.nonParticipantSpouse;
  }

  ngOnInit() {}
}
