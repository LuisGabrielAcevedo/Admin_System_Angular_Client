import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-netflix',
  templateUrl: './netflix.component.html',
  styleUrls: ['./netflix.component.css']
})
export class NetflixComponent implements OnInit {
  public image: string = 'src/assets/images/netfilx.png';
  constructor() { }
  ngOnInit() {
  }

}
