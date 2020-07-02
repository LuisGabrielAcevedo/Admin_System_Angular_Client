import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@mcy/core/core.module';
import { FormControl } from '@angular/forms';

const data = [
    { value: 'employee', viewValue: 'Empleados' },
    { value: 'client', viewValue: 'Clientes' },
    { value: 'provider', viewValue: 'Proveedores' },
    { value: 'service', viewValue: 'Servicios' },
    { value: 'others', viewValue: 'Otros' }
];

storiesOf('Select', module)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			declarations: [],
			imports: [BrowserAnimationsModule, CoreModule]
		})
	)
	.add('Component', () => {
        const selectFieldControl: FormControl = new FormControl(null);

		return {
			template: `<div class="contact-list__categories" >
                        <mcy-select
                            [data]="data"
                            label="Categorias"
                            formControlName="categories">
                        </mcy-select>
                    </div>`,
			props: {
                label: text("Label", "Categorias"),
                control: selectFieldControl,
                data
			}
		};
	})
	.add('Error message', () => {
		return {
			template: ` <div>
                            <mcy-select
                            [data]="data"
                            label="Categorias"
                            formControlName="categories">
								<span error>
									{{error}}
								</span>
							</mcy-select>
                        </div>`,
			props: {
				label: text('Label', 'Categorias'),
				error: text('Error message', 'Write your error message'),
				data
			}
		};
	});
