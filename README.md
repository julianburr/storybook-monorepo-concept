# Storybook Monorepo Concept

This is a basic concept for integrating storybook into a react mono repo.

## Get Started

```bash
git clone https://github.com/julianburr/storybook-monorepo-concept.git
cd storybook-monorepo-concept
yarn install

# To install the test packages
# Obv in production this would be handled by a mono repo
#  manager like lerna
cd packages/firstpackage
yarn install

cd ../secondpackage
yarn install

# Run storybook
cd ../..  # back to the root directory
yarn storybook
```

## The Idea

Integrating storybook on both the root level and the component level would allow developers (and even designers if you set up a hosted version of the root repo) to easily see all available components with all abstractions and variations they need to know of set up as stories.

With plugins like Knobs, Info, Readme, etc it is also possible to get automatic documentation and to play around with the components' props without having to set up your own testing environment!


## Integration Plan

Storybook needs to be installed both in the root repo and in all component repos that want to use it, so we can run the command in both and get either a list of components available or just the component we ran the command from.

All the configurations are in the `.storybook` sub directory. The global config is supposed to load all files follwing the pattern `/packages/**/stories/**.js` into storybook, using webpacks `require.context` method.

On component level we need to export the stories as a function, in order to be able to pass the relevant storybook context depending on where the storybook is called from. The first argument of the function is the storybook instance, so e.g.:

```js
// component/stories/*.js
export default ({storiesOf}) => {
  storiesOf('MyComponent')
    .add('default' => <MyComponent />);
}
```

The following command has to be added to the components `package.json`:

```json
"storybook": "start-storybook -p 9001 -c .storybook" 
```

We should maybe define different ports for the root and the component level, so you can run both at the same time?!

In `.storybook/config.js` we the need to do something like this:

```js
import * from 'storybook';

// Webpack require context
const req = require.context('..', true, coolRegexThatGrabsAllStories);

function loadStories () {
  req.keys().forEach(path => {
    story = req(path).default;
      story(storybook);
  });
}

storybook.configure(loadStories, module);
```

The *coolRegexThatGrabsAllStories* could be something like the following for the root repo, to grab all js files that lie in a `stories` directory ignoring everything in the `node_modules` folders:

```
/packages\/((?!node_modules).)*\/stories\/[^\/]+\.js$/
```

**Todo:** Verify that `require.context` is usable even in a large repo with a lot of files, cause I think it might run into problems if the context given (the root directory to start from) includes too many files.

**Sidenote:** `require.context` will almost certainly run into issues when you start linking sub-repos, as it might end up in loops the require gets stuck in ... todo investigating solutions for theses scenarios...


## Useful Plugins

All plugins have to be added to the root level as well as the components that want to use them in order to be able to run the stroybook over all components as well as individually.

Addons need to be setup following the instructions in the respective plugin readme.


### Knobs

[https://github.com/storybooks/storybook-addon-knobs](https://github.com/storybooks/storybook-addon-knobs)

Knobs is a plugin that lets you define flexible properties to be passed on to the story component. This will allow the user to change the props on the fly in the sidebar without having to change any source code.

There is also [a plugin](https://github.com/joeybaker/storybook-addon-smart-knobs) that automatically configures the props using Knobs, not sure how much sense this automation makes and how well it will work in our components...

### Info

[https://github.com/storybooks/react-storybook-addon-info](https://github.com/storybooks/react-storybook-addon-info)

The info plugin created a dynamic documentation of the story component and its props based on the source code, so no more manually documentation of component APIs :)

### Storyshots

[https://github.com/storybooks/storyshots](https://github.com/storybooks/storyshots)

Automatically creates Jest snapshot tests for all stories.

### Readme

[https://github.com/tuchk4/storybook-readme](https://github.com/tuchk4/storybook-readme)

Automatically creates a panel with a given readme. We could potentially automatically grab all available readmes in a components repo and show them in storybook.

Might be a bit superflous tho...
