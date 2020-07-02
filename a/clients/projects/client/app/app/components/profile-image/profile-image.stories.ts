import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@mcy/core/core.module';
import { ProfileImageComponent } from './profile-image.component';

storiesOf('Profile image', module)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			declarations: [ProfileImageComponent],
			imports: [BrowserAnimationsModule, CoreModule]
		})
	)
	.add('Component', () => {
		return {
			template: ` <mcy-profile-image></mcy-profile-image>`
		};
	})
	.add('Size', () => {
		return {
			template: ` <mcy-profile-image size="small"></mcy-profile-image>
						<mcy-profile-image size="medium"></mcy-profile-image>
						<mcy-profile-image size="large"></mcy-profile-image>`
		};
	})
	.add('Selected', () => {
		return {
			template: ` <mcy-profile-image selected="true"></mcy-profile-image>`
		};
	});
