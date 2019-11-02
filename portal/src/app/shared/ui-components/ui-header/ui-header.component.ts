import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-header',
  templateUrl: './ui-header.component.html',
  styleUrls: ['./ui-header.component.scss']
})
export class UiHeaderComponent implements OnInit {
  expandedCollapsed = false;

  @Input() fixed = false;

  constructor() {}

  ngOnInit() {}
}
