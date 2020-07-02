import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { CoreModule } from '@mcy/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Validators, FormControl } from '@angular/forms';

storiesOf('Input', module)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			declarations: [],
			imports: [CoreModule, BrowserAnimationsModule]
		})
	)
	.add('Component', () => {
		const inputControl: FormControl = new FormControl(null);
		return {
			template: `<mcy-input
							[type]="typeOptions"
							[label]="label"
							[formControl]="control"
                            [placeholder]="placeholder">
						</mcy-input>
						<mcy-button
							(handleClick)="reset()"
							color="primary">
							Reset
						</mcy-button>`,
			props: {
				typeOptions: select('type', ['text', 'number', 'password'], 'text'),
				label: text('Label', 'Full name'),
				placeholder: text('Placeholder', 'Write your full name'),
				validators: [Validators.required],
				control: inputControl,
				reset: () => {
					inputControl.reset();
				}
			}
		};
	})
	.add('Hint message', () => {
		return {
			template: `<mcy-input
							type="text"
							[label]="label">
								<span hint>{{hint}}</span>
						</mcy-input>`,
			props: {
				label: text('Label', 'Full name'),
				hint: text('Hint message', 'Write your hint message')
			}
		};
	})
	.add('Error message', () => {
		return {
			template: `<mcy-input
							type="text"
							[label]="label"
							[validators]="validators">
								<span error>{{error}}</span>
						</mcy-input>`,
			props: {
				label: text('Label', 'Full name'),
				validators: [Validators.required],
				error: text('Error message', 'Write your error message')
			}
		};
	});
