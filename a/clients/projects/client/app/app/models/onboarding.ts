export interface OnboardingImage{
	src: string;
	alt: string;	
}

export function makeOnboardingImage(data: Partial<OnboardingImage>): OnboardingImage {
	const defaultValue: OnboardingImage = {
		src: '',
		alt: ''	
	};

	return { ...defaultValue, ...data };
}
