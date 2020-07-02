import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@mcy/core/core.module';
import { FormControl } from '@angular/forms';
import { SoftTokenComponent } from './soft-token.component';

storiesOf('Soft token', module)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			declarations: [SoftTokenComponent],
			imports: [BrowserAnimationsModule, CoreModule]
		})
	)
	.add('Component', () => {
		const amountInputControl: FormControl = new FormControl(null);
		return {
			template: ` <div>
                            <mcy-soft-token
                                [label]="label"
                                [formControl]="control">
                            </mcy-soft-token>
                            <mcy-button
                                (handleClick)="reset()"
                                color="primary">
                                Reset
                            </mcy-button>
                        </div>`,
			props: {
				label: text('Label', 'Inserte tu soft token'),
				control: amountInputControl,
				reset: () => {
					amountInputControl.reset();
				}
			}
		};
	});
