import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-readonly',
  templateUrl: './readonly.component.html',
  styleUrls: ['./readonly.component.scss']
})
export class ReadonlyComponent implements OnInit {
  @Input() label: string;
  @Input() inline: boolean = false;

  constructor() {}

  ngOnInit() {}
}
