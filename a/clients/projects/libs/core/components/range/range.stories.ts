import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { CoreModule } from '@mcy/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

storiesOf('Range', module)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			declarations: [],
			imports: [CoreModule, BrowserAnimationsModule]
		})
	)
	.add('Range', () => {
		return {
			template: `<mcy-range min="1" max="50" ></mcy-range>`
		};
	});
