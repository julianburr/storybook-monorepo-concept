import React from 'react';
import SecondPackage from '../index';

import { withKnobs, number, text } from '@kadira/storybook-addon-knobs';
import { WithNotes } from '@kadira/storybook-addon-notes';

export default ({storiesOf, action})  => {

  storiesOf('Second Package', module)
    .addDecorator(withKnobs)
    .addWithInfo('default', () => {
      const heading = text('heading', 'This is awesome');
      return (
        <SecondPackage 
          heading={heading} 
          elements={[
            'This is a list',
            'With multiple items',
            'Passed in as array'
          ]}
        />
      );
    });
}