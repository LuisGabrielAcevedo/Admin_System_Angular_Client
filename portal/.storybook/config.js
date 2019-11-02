import { configure, addParameters } from '@storybook/angular';
import { themes } from '@storybook/theming';
import theme from './theme';
import '!style-loader!css-loader!./reset.css';

// automatically import all files ending in *.stories.ts
const req = require.context('../src/stories', true, /\.stories\.ts$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  backgrounds: [
    { name: 'night', value: '#000000' },
    { name: 'day', value: '#eeeeee', default: true }
  ],
  options: {
    theme: theme,
    panelPosition: 'right'
  }
});

configure(loadStories, module);
