import PropTypes from 'prop-types';
import React, { Component } from 'react';
import useLocation from 'utils/useLocation';

class ScrollToTopInner extends Component {
  componentDidUpdate(prevProps) {
    const { pathname } = this.props;
    const { pathname: prevPathname } = prevProps;
    if (pathname !== prevPathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

ScrollToTopInner.propTypes = () => ({
  children: PropTypes.any,
  pathname: PropTypes.string,
});

const ScrollToTop = (props) => {
  const { location } = useLocation();
  return (
    <ScrollToTopInner {...props} pathname={location.pathname} />
  );
};

export default ScrollToTop;
