import * as PropTypes from 'prop-types';
import React from 'react';
import NamedContext from './NamedContext';


export default class SimpleConsumer extends React.Component {
  static getDerivedStateFromProps(props) {
    const {
      namespace,
    } = props;
    return {
      Context: NamedContext(namespace),
    };
  }

  state = {
    Context: null,
  };

  render() {
    const {
      Context,
    } = this.state;
    const {
      children,
    } = this.props;
    return (
      <Context.Consumer>
        {([value, setValue]) => children([value, setValue])}
      </Context.Consumer>
    );
  }
}


SimpleConsumer.propTypes = {
  namespace: PropTypes.string,
  children: PropTypes.func,
};
