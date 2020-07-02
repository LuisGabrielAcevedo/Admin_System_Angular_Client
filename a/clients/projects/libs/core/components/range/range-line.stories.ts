import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, select } from '@storybook/addon-knobs';
import { CoreModule } from '@mcy/core/core.module';

storiesOf('Range line', module)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			declarations: [],
			imports: [CoreModule]
		})
	)
	.add('Component', () => {
		return {
			template: `<mcy-range-line [min]="min" [max]="max" [value]="value"></mcy-range-line>`,
			props: {
				min: select('min', [1, 2, 3, 4, 5, 6, 7, 8, 9], 0),
				max: select('max', [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100], 90),
				value: select('value', [1, 2, 3, 4, 5, 6, 17, 28, 39, 44, 57], 17)
			}
		};
	});
