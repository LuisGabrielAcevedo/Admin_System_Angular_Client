import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AnalyticsService } from '@mcy/main/services/analytics.service';
import { UserService } from './app/services/user.service';
import { Subscription } from 'rxjs';
import { makeUserState } from './app/models';

@Component({
	selector: 'mcy-root',
	templateUrl: 'root.component.html',
	styleUrls: ['root.component.scss'],
})
export class RootComponent implements OnInit, OnDestroy {
	public subscription = new Subscription();
	public userState = makeUserState({});

	constructor(
		private router: Router,
		private analyticsService: AnalyticsService,
		private userService: UserService
	) {
		this.analyticsService.init();
		this.subscription.add(
			this.router.events.subscribe(event => {
				if (event instanceof NavigationEnd) {
					window.scrollTo(0, 0);
				}
			})
		);
	}

	ngOnInit() {
		this.subscription.add(
			this.userService.getUserState().subscribe((state) => {
				this.userState = state;
			})
		)
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get isInsideDashboard(): boolean {
		const currentUrl = window.location.href;
		return currentUrl.includes('/app') && !currentUrl.includes('/app/enterprise');
	}

	get isLoading(): boolean {
		return (this.userState.loadingPermissions || this.userState.isLoading) && this.isInsideDashboard;
	}
}
