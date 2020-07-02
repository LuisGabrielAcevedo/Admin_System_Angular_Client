import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { OnboardingImageComponent } from 'client/app/app/components/welcome-modal/onboarding-image/onboarding-image.component';
import { makeCarouselConfiguration } from 'client/app/app/models/carousel';
import { TranslateService } from '@ngx-translate/core';
import { OnboardingImage } from 'client/app/app/models/onboarding';
import { RESOURCES } from 'client/app/app/constants/index';

@Component({
	selector: 'mcy-onboarding-carousel',
	templateUrl: './onboarding-carousel.component.html',
	styleUrls: ['./onboarding-carousel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class OnboardingCarouselComponent  {
	public imageList: OnboardingImage[] = [];
	public component = OnboardingImageComponent;
	public selectedPoint: number = 0;
	@Output() exitFlow = new EventEmitter();

	public configurationCarousel = makeCarouselConfiguration(1, false);

	constructor( private translateService: TranslateService ) {
		this.imageList = this.generateImageArray();
	}

	sliderChange(event: number) {
		this.selectedPoint = event;
	}

	get selectedSlideTitle() {
		return this.translateService.instant(`components.welcomeModal.onboardingCarousel.${this.selectedPoint}.title`)
	}

	get selectedSlideDescription() {
		return this.translateService.instant( `components.welcomeModal.onboardingCarousel.${this.selectedPoint}.description`)
	}

	onExitFlow() {
		this.exitFlow.emit();
	}

	generateImageArray(): OnboardingImage[] {
		return RESOURCES.IMAGES.ONBOARDING.map((imageSrc, index) => {
			return { src: imageSrc, alt: this.translateService.instant(`components.welcomeModal.onboardingCarousel.${index}.title`)}
		})
	}
}
