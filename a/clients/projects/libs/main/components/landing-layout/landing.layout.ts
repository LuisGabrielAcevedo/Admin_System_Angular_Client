import { Component } from '@angular/core';
import { MainService } from '@mcy/main/main.service';

@Component({
	selector: 'mcy-landing-layout',
	templateUrl: './landing.layout.html',
	styleUrls: ['./landing.layout.scss']
})

export class LandingLayout {
	showVersion = false;

	constructor(private main: MainService,) {
		this.showVersion = this.main.config.showVersion;
	 }
}
