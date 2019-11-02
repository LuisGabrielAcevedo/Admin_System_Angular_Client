import { storiesOf, moduleMetadata } from '@storybook/angular';
import { UiComponentsModule } from '@app/shared/ui-components/ui-components.module';
import { text, array, boolean, withKnobs } from '@storybook/addon-knobs';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormsModule,
  FormGroup
} from '@angular/forms';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

const usage = `
Usage example:
        
\`\`\`html
  
        <app-field
            [label]="label"
            [required]="required"
            [tooltip]="tooltip"
            [errors]="errors">

                <input /> 
                <!-- or any other component -->
            
        </app-field>
          
\`\`\`
`;

const usage2 = `
Usage example:
        
\`\`\`html
  
        <form [formGroup]="form">
            
            <app-form-field
                [label]="label"
                [tooltip]="tooltip"
                [formSubmitted]="formSubmited">
                
                <input formControlName="nameField"/>

              </app-form-field>
              
        </form>
          
\`\`\`

controller:

\`\`\`javascript

        form = new FormGroup({
            nameField: new FormControl('', Validators.required)
        });

\`\`\`

`;

@Component({
  selector: 'app-form-example',
  template: `
    <form [formGroup]="form">
      <app-form-field
        [label]="label"
        [tooltip]="tooltip"
        [formSubmitted]="formSubmited"
      >
        <input formControlName="nameField" style="width:100%" />
      </app-form-field>
    </form>
  `
})
export class FormExampleComponent {
  @Input() label: string;
  @Input() tooltip: string;
  @Input() formSubmited = false;
  form = new FormGroup({
    nameField: new FormControl('', Validators.required)
  });
}

storiesOf('Field', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonModule,
        UiComponentsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [FormExampleComponent]
    })
  )
  .add(
    'with options',
    () => ({
      template: `<app-field
    [label]="label"
    [required]="required"
    [tooltip]="tooltip"
    [errors]="errors"
  >
    <input style="width:100%"/>
  </app-field>`,
      props: {
        label: text('label', 'Label of the Field'),
        required: boolean('required', true),
        tooltip: text('tooltip', 'Help about the field'),
        errors: array('errors', ['Error!!!'])
      }
    }),
    {
      notes: {
        markdown: usage
      }
    }
  )
  .add(
    'with reactive form',
    () => ({
      template: `<app-form-example 
    [label]="label"
    [tooltip]="tooltip"
    [formSubmited]="formSubmited"></app-form-example>`,
      props: {
        label: text('label', 'Name'),
        tooltip: text('tooltip', 'Your first name'),
        formSubmited: boolean('form submited', false)
      }
    }),
    {
      notes: {
        markdown: usage2
      }
    }
  );
