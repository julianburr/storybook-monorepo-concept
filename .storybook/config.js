import * as storybook from '@kadira/storybook';
import info from '@kadira/react-storybook-addon-info';

storybook.setAddon(info);

const req = require.context('..', true, /packages\/((?!node_modules).)*\/stories\/[^\/]+\.js$/);
function loadStories() {
  req.keys().forEach(path => {
    const story = req(path).default;
    story(storybook);
  });
}

storybook.configure(loadStories, module);