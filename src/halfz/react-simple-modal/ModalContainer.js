import * as PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import useLocation from 'utils/useLocation';
import { ModalConsumer } from './ModalContext';

// eslint-disable-next-line react/prefer-stateless-function
class ModalContainerInner extends React.PureComponent {
  static getDerivedStateFromProps(props) {
    const {
      getModals,
    } = props;
    return {
      modals: getModals() || [],
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      modals: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { routeKey, reset } = this.props;
    const { routeKey: prevPathname } = prevProps;
    if (routeKey !== prevPathname) {
      reset();
    }
  }

  render() {
    const {
      modals,
    } = this.state;
    return (
      <Fragment>
        {modals.map((v) => v[1](v[2]))}
      </Fragment>
    );
  }
}

ModalContainerInner.propTypes = {
  getModals: PropTypes.func,
  reset: PropTypes.func,
  routeKey: PropTypes.string,
};

const ModalContainer = () => {
  const { location } = useLocation();
  return (
    <ModalConsumer>
      {/* eslint-disable-next-line no-unused-vars */}
      {([_, __, getModals, ___, reset]) => (<ModalContainerInner routeKey={location.pathname} getModals={getModals} reset={reset} />)}
    </ModalConsumer>
  );
};

export default ModalContainer;
