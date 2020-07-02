
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ScreenService } from '@mcy/main/services/screen.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { Sidebar } from 'ng-sidebar';
import { Subscription } from 'rxjs';

@Component({
	templateUrl: './main.layout.html',
	styleUrls: ['./main.layout.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MainLayout {
	@ViewChild('sideBar', {static: true}) sideBar?: Sidebar;
	isMobile: boolean = false;
	menuOpened: boolean = true;
	public subscription = new Subscription();

	constructor(
		private screenService: ScreenService,
		public sidenavService: SidenavService
	) {
		this.subscription.add(
		this.screenService.isMobileObserver()
			.subscribe(breakpointState => {
				const isMobile = breakpointState.matches;
				// Re render the container when moving from one breakpoint to another
				if (this.sideBar) {
					this.sideBar.triggerRerender();
				}
				this.isMobile = isMobile;
			})
		);
	}

	toggleMenu() {
		this.menuOpened = !this.menuOpened;
	}
}
