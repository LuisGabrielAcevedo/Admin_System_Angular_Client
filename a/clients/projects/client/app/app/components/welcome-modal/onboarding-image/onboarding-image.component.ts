import { Component } from '@angular/core';
import { OnboardingImage, makeOnboardingImage } from 'client/app/app/models/onboarding';

@Component({
	selector: 'mcy-onboarding-image',
	templateUrl: './onboarding-image.component.html',
	styleUrls: ['./onboarding-image.component.scss']
})
export class OnboardingImageComponent {

	public data: OnboardingImage = makeOnboardingImage({});

}
