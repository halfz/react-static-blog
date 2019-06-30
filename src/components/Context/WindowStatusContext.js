import autoBind from 'auto-bind';
import * as PropTypes from 'prop-types';
import React, { createContext } from 'react';

const Context = createContext();

export class WindowStatusProvider extends React.Component {
  static getDerivedStateFromProps() {
    if (typeof window !== 'undefined') {
      return {
        width: `${window.screen.width}px`,
        height: `${window.screen.height}px`,
        widthRaw: window.screen.width,
        heightRaw: window.screen.height,
        innerWidth: `${window.innerWidth}px`,
        innerHeight: `${window.innerHeight}px`,
        X: window.pageXOffset || 0,
        Y: window.pageYOffset || 0,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      width: '100%',
      height: '100%',
      widthRaw: null,
      heightRaw: null,
      innerWidth: null,
      innerHeight: null,
      X: 0,
      Y: 0,
    };
    autoBind(this);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      window.addEventListener('scroll', this.updateScroll);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateWindowDimensions);
      window.removeEventListener('scroll', this.updateScroll);
    }
  }


  updateScroll() {
    if (typeof window !== 'undefined') {
      this.setState({
        X: window.pageXOffset || 0,
        Y: window.pageYOffset || 0,
      });
    }
  }

  updateWindowDimensions() {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line react/no-access-state-in-setstate
      this.setState(WindowStatusProvider.getDerivedStateFromProps(this.state));
    }
  }

  render() {
    const {
      children,
    } = this.props;
    return (
      <Context.Provider value={[this.state, this.setState]}>
        {children}
      </Context.Provider>
    );
  }
}

WindowStatusProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const WindowStatusConsumer = (props) => (
  <Context.Consumer {...props}>
    {(([value]) => props.children(value))}
  </Context.Consumer>
);

WindowStatusConsumer.propTypes = {
  isServer: PropTypes.bool,
  children: PropTypes.func,
};
