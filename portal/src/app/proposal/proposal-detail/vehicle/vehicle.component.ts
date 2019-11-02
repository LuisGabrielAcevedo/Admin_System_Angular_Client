import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '@app/proposal/api/proposal';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  @Input() vehicle: Vehicle;

  public noData = '-';

  constructor() {}

  ngOnInit() {}
}
