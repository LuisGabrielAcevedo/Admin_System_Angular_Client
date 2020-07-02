import { Component } from '@angular/core';
import { MainService } from '../../main.service';
import { version } from '../../version';
import { ScreenService } from '@mcy/main/services/screen.service';

@Component({
	selector: 'mcy-main-info',
	template: `
		<div>
			<span>{{ appVersion }} - {{ env }} - </span>
			<span>{{ device }}</span>
		</div>
	`,
	styleUrls: ['./main-info.scss']
})
export class MainInfoComponent {
	env: string;
	version: string;
	appVersion: string;
	device: string;

	constructor(private mainService: MainService, private screen: ScreenService) {
		this.appVersion = this.mainService.config.appVersion;
		this.version = version;
		this.env = this.mainService.config.envName;
		this.device = 'desktop';

		this.screen.isMobileObserver().subscribe(device => {
			this.device = device.matches ? 'mobile' : 'desktop';
		});
		
		info(this.appVersion, this.env);
	}
}
