import autoBind from 'auto-bind';
import * as PropTypes from 'prop-types';
import React from 'react';
import NamedContext from './NamedContext';


export default class SimpleProvider extends React.Component {
  static getDerivedStateFromProps(props) {
    const {
      state,
    } = props;
    if (state) {
      return {
        value: state[0],
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    if (!props.state) {
      this.state = {
        value: props.initialValue,
      };
      this.setValue = (value) => {
        this.setState({ value });
      };
      autoBind(this);
    } else {
      this.state = {
        value: props.state[0],
      };
      this.setValue = props.state[1];
    }
    this.Context = NamedContext(props.namespace);
  }

  render() {
    const {
      value,
    } = this.state;
    const {
      children,
    } = this.props;
    const { Context } = this;
    return (
      <Context.Provider value={[value, this.setValue]}>
        {children}
      </Context.Provider>
    );
  }
}

SimpleProvider.propTypes = {
  namespace: PropTypes.string,
  state: PropTypes.array,
  initialValue: PropTypes.any,
  children: PropTypes.node,
};
