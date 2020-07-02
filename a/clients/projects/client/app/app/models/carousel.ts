export interface ICarouselConfiguration {
	numberOfItems: number,
	configuration: {
		grid: {
			xs: number,
			sm: number,
			md: number,
			lg: number,
			all: number
		},
		point: {
			visible: boolean
		},
		speed: number,
		easing: string,
		touch: boolean
	}
}

export interface ICarouselItem {
	item: any
}

export interface ICarouselComponent {
	component: any,
	data: any
}

export function makeCarouselConfiguration(numberOfItems: number, isTouch: boolean = true): ICarouselConfiguration {
	const speed = 250;

	return {
		numberOfItems,
		configuration: {
			grid: {
				xs: 1,
				sm: 1,
				md: numberOfItems,
				lg: numberOfItems,
				all: 0
			},
			point: {
				visible: true
			},
			speed,
			easing: 'ease',
			touch: isTouch
		}
	}
}

export function makeDefaultCarouselConfiguration() {
	return makeCarouselConfiguration(4);
}
