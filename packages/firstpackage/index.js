import React, { Component, PropTypes } from 'react';

export default class FirstPackage extends Component {
  static propTypes = {
    headingLevel: PropTypes.number,
    subTitle: PropTypes.string
  };

  static defaultProps = {
    headingLevel: 1
  };

  render () {
    const { headingLevel, subTitle } = this.props;
    const Heading = `h${headingLevel}`;
    return (
      <div>
        <Heading>Hello World!</Heading>
        {subTitle && <p>{subTitle}</p>}
      </div>
    );
  }
}