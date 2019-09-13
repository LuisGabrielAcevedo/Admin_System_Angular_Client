import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
declare const require: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data: any[] = [];
  loading: boolean;
  resource: string;
  modelClass: any;
  constructor(
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter((event: ActivationEnd) => event instanceof ActivationEnd)
      )
      .subscribe(resp => {
        this.resource = resp.snapshot.params['resource'];
        if (this.resource) {
          this.modelClass = require(`src/app/models/adminSystem/${this.resource}`).default;
          this.loadData();
        }
      });
  }

  ngOnInit() {
  }

  async loadData() {
    this.modelClass.findRx(1, 10).subscribe(resp => {
      this.data = resp.data;
    });
  }

  async loadAspects() {
  }

}
