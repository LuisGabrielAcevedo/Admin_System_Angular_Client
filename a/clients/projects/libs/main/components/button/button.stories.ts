import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@mcy/core/core.module';

storiesOf('Button', module)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			imports: [BrowserAnimationsModule, CoreModule]
		})
	)
	.add('Component', () => {
		return {
			template: ` <mcy-button>Click</mcy-button>`
		};
	})
	.add('Color', () => {
		return {
			template: ` <mcy-button color="primary">Primary</mcy-button>
                        <mcy-button color="secondary">Secondary</mcy-button>`
		};
	})
	.add('Disabled', () => {
		return {
			template: ` <mcy-button disabled="true">Disabled</mcy-button>`
		};
	});
