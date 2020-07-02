import { moduleMetadata, storiesOf } from '@storybook/angular';
import { text, withKnobs } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountSelectComponent } from './account-select.component';
import { CoreModule } from '@mcy/core/core.module';
import { IAccount, makeAccount, makeCurrency } from 'client/app/app/models';
import { FormControl } from '@angular/forms';

const accounts: IAccount[] = [
	makeAccount({
		number: '34564567-343/7',
		type: 'CC',
		balance: 8000,
		currency: makeCurrency({
			symbol: 'ARS'
		})
	}),
	makeAccount({
		number: '22114567-343/7',
		type: 'CA',
		balance: 5000,
		currency: makeCurrency({
			symbol: 'ARS'
		})
	})
];

storiesOf('Account select', module)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			declarations: [AccountSelectComponent],
			imports: [BrowserAnimationsModule, CoreModule]
		})
	)
	.add('Component', () => {
		const accountControl: FormControl = new FormControl(null);
		return {
			template: ` <div>
                            <mcy-account-select
                                [label]="label"
								balanceText="Saldo:"
								[formControl]="control"
								[accounts]="accounts">
							</mcy-account-select>
							<mcy-button
								(handleClick)="reset()"
								color="primary">
								Reset
							</mcy-button>
                        </div>`,
			props: {
				label: text('Label', 'Cuenta de origen de los fondos *'),
				control: accountControl,
				reset: () => {
					accountControl.reset();
				},
				accounts
			}
		};
	})
	.add('Error message', () => {
		return {
			template: ` <div>
                            <mcy-account-select
                                [label]="label"
								balanceText="Saldo:"
								required="true"
								[accounts]="accounts">
								<span error>
									{{error}}
								</span>
							</mcy-account-select>
                        </div>`,
			props: {
				label: text('Label', 'Cuenta de origen de los fondos *'),
				error: text('Error message', 'Write your error message'),
				accounts
			}
		};
	});
