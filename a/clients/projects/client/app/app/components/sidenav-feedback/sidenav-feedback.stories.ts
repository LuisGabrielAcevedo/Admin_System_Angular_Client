import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { CoreModule } from '@mcy/core/core.module';
import { SidenavFeedbackComponent } from './sidenav-feedback.component';
import { FeedbackStatus } from 'client/app/app/models';

storiesOf('Sidenav feddback', module)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			declarations: [SidenavFeedbackComponent],
			imports: [CoreModule]
		})
	)
	.add('Sidenav feddback', () => {
		return {
			template: `<mcy-sidenav-feedback [message]="message" [status]="status"></mcy-sidenav-feedback>`,
			props: {
				message: text('message', 'Write a message ...'),
				status: select(
					'status',
					[FeedbackStatus.success, FeedbackStatus.error, FeedbackStatus.info],
					FeedbackStatus.success)
			}
		};
	});
