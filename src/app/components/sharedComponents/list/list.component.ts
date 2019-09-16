import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
declare const require: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  public data: any[] = [];
  public loading: boolean;
  public resource: string;
  public modelClass: any;
  constructor(
    public router: Router
  ) {
    this.subscriptions.push(this.router.events
      .pipe(
        filter((event: ActivationEnd) => 
          event instanceof ActivationEnd 
          && event.snapshot.params['resource']
          && event.snapshot.params['resource'] !== this.resource
        ),
        map(event => event.snapshot.params['resource'])
      )
      .subscribe(resource => {
        this.resource = resource;
        this.modelClass = require(`src/app/models/adminSystem/${this.resource}`).default;
        this.loadData();
      })
    );
  }

  ngOnInit(){
  }

  public loadData(): void {
    this.modelClass.findRx(1, 10).subscribe(resp => {
      this.data = resp.data;
    });
  }

  public goToForm(): void {
    this.router.navigate([`/admin-system/${this.resource}/new`]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
