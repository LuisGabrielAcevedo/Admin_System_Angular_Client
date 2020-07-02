import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { CoreModule } from '@mcy/core/core.module';

storiesOf('Icon', module)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			imports: [CoreModule]
		})
	)
	.add('Component', () => {
		return {
			template: ` <mcy-icon>notificacao</mcy-icon>
                        <mcy-icon>fechar</mcy-icon>`
		};
	});
