import React from 'react';
import FirstPackage from '../index';

import { withKnobs, number, text } from '@kadira/storybook-addon-knobs';
import { WithNotes } from '@kadira/storybook-addon-notes';

export default ({storiesOf, action})  => {

  storiesOf('First Package', module)
    .addDecorator(withKnobs)
    .addWithInfo('default', () => {
      const headlingLevel = number('headingLevel', 2);
      const subTitle = text('subTitle', 'This is awesome');
      return (
        <WithNotes notes='Some note...'>
          <FirstPackage 
            headingLevel={headlingLevel} 
            subTitle={subTitle}
          />
        </WithNotes>
      );
    });
}