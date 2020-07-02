import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'mcy-sidenav-content',
	templateUrl: './sidenav-content.component.html',
	styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit, OnDestroy {
	public subscription: Subscription;

	constructor(
		private router: Router,
		public sidenavService: SidenavService,
	) {
		this.subscription = new Subscription();
	}

	ngOnInit() {
		this.subscription.add(
			this.router.events.subscribe((route) => {
				if(route instanceof NavigationEnd) {
					if(this.sidenavService.opened) {
						this.sidenavService.close();
					}
				}
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	closeSidenav() {
		this.sidenavService.preClose();
	}

	cancel() {
		this.sidenavService.cancel();
	}

	close() {
		this.sidenavService.close();
	}
}
