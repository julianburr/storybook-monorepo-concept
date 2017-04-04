import React from 'react';
import SecondPackage from '../index';

import { withKnobs, number, text, array } from '@kadira/storybook-addon-knobs';
import { WithNotes } from '@kadira/storybook-addon-notes';

export default ({storiesOf, action})  => {

  storiesOf('Second Package', module)
    .addDecorator(withKnobs)
    .addWithInfo('advanced', () => {
      const heading = text('heading', 'This is awesome');
      const elements = array('elements', ['This is a list', 'With multiple items', 'Passed in as array'], ',');
      return (
        <SecondPackage 
          heading={heading} 
          elements={elements}
          onElementClick={action('Element pressed')}
        />
      );
    });
}