import React, { Component, PropTypes } from 'react';

export default class SecondPackage extends Component {
  static propTypes = {
    heading: PropTypes.string,
    elements: PropTypes.arrayOf(PropTypes.element),
    listType: PropTypes.string,
    onElementClick: PropTypes.func
  };

  static defaultProps = {
    elements: [],
    listType: 'ul'
  };

  render () {
    const { heading, elements, onElementClick } = this.props;
    const List = this.props.listType;
    return (
      <div>
        <h1>{heading}</h1>
        <List>
          {elements.map((element, i) => (
            <li key={i}>
              <a href="#" onClick={onElementClick}>{element}</a>
            </li>
          ))}
        </List>
      </div>
    );
  }
}