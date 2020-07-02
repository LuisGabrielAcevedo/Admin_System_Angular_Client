import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text } from '@storybook/addon-knobs';
import { AmountInputComponent } from './amount-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CoreModule } from '@mcy/core/core.module';
import { FormControl, Validators } from '@angular/forms';

storiesOf('Amount input', module)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			declarations: [AmountInputComponent],
			imports: [BrowserAnimationsModule, CoreModule, CurrencyMaskModule]
		})
	)
	.add('Component', () => {
		const amountInputControl: FormControl = new FormControl(null);
		return {
			template: ` <div>
                            <mcy-amount-input
                                [label]="label"
                                [formControl]="control">
                            </mcy-amount-input>
                            <mcy-button
                                (handleClick)="reset()"
                                color="primary">
                                Reset
                            </mcy-button>
                        </div>`,
			props: {
				label: text('Label', 'Importe total *'),
				control: amountInputControl,
				reset: () => {
					amountInputControl.reset();
				}
			}
		};
	})
	.add('Currency', () => {
		return {
			template: ` <div>
                            <mcy-amount-input
                                label="Importe en pesos"
                                currency="ARS">
                            </mcy-amount-input>
                            <mcy-amount-input
                                label="Importe en dolares"
                                currency="USD">
                            </mcy-amount-input>
                        </div>`
		};
	})
	.add('Error message', () => {
		return {
			template: `<mcy-input
                            label="Importe en pesos"
                            currency="ARS"
							[validators]="validators">
								<span error>{{error}}</span>
						</mcy-input>`,
			props: {
				validators: [Validators.required],
				error: text('Error message', 'Write your error message')
			}
		};
	});
