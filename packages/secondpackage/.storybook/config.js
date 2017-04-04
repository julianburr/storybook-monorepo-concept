import * as storybook from '@kadira/storybook';
import * as knobs from '@kadira/storybook-addon-knobs';
import * as notes from '@kadira/storybook-addon-notes';
import info from '@kadira/react-storybook-addon-info';

storybook.setAddon(info);

const req = require.context('../stories', true, /[^\/]+.js$/);

function loadStories() {
  req.keys().forEach(path => {
    const story = req(path).default;
    story(storybook);
  });
}

storybook.configure(loadStories, module);