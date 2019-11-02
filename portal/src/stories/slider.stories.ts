import { storiesOf } from '@storybook/angular';
import { text, number, withKnobs } from '@storybook/addon-knobs';
import { SliderComponent } from '@app/pre-proposal/components/slider/slider.component';
import { createFunction } from './util';

const ID = 'SLIDER';

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'night', value: '#000000', default: true }]
  })
  .add(
    'with options',
    () => ({
      component: SliderComponent,
      props: {
        maxLimit: number(
          'max limit',
          900,
          {
            range: true,
            min: 100,
            max: 1000,
            step: 100
          },
          ID
        ),
        minLimit: number(
          'min limit',
          0,
          {
            range: true,
            min: 0,
            max: 1000,
            step: 100
          },
          ID
        ),
        step: number(
          'step',
          100,
          {
            range: true,
            min: 1,
            max: 100,
            step: 1
          },
          ID
        ),
        maxLabel: text('max label', 'max', ID),
        maxLimitLabel: text('max limit label', 'max limit', ID),
        minLimitLabel: text('min limit label', 'min limit', ID),
        formatFunction: createFunction(
          text('format function', 'value => `BRL ${value}`', ID)
        )
      }
    }),
    {
      notes: {
        markdown: `Usage example:

        \`\`\`html

        <app-slider
            formControlName="sliderControl"
            (change)="changeValue()"
            [maxLimit]="900"
            [minLimit]="100"
            [max]="1000"
            [step]="10"
            [formatFunction]="myFormatFunction"
            [maxLabel]="'Max Label'"
            [maxLimitLabel]="'Max Limit'"
            [minLimitLabel]="'Min Limit'"
        ></app-slider>
        
        \`\`\`
        `
      }
    }
  );
