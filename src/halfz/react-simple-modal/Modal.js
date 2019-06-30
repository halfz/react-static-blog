import PropTypes from 'prop-types';

import React, {
  memo,
  useMemo,
} from 'react';
import styled from 'styled-components';
import {
  MOBILE_WIDTH,
  Z_INDEX,
} from 'const';
import { ModalConsumer } from './ModalContext';

const Modal = styled.div`
  z-index: ${Z_INDEX.MODAL};
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: ${MOBILE_WIDTH}) {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
`;

export const ModalBackground = styled.div`
  z-index: ${Z_INDEX.SIMPLE_BOTTOM};
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;
const ModalInner = styled.div`
  z-index: ${Z_INDEX.MODAL};
  
  @media (max-width: ${MOBILE_WIDTH}) {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

/*
  It is a simple box modal
  for PrivacyPolicy, TermOfUses popup on sign ups
*/
export const ModalComponent = memo((props) => {
  const {
    render,
    close,
    args,
    modalId,
    status,
    openDuration,
    closeDuration,
  } = props;
  const modal = useMemo(() => render(
    {
      close: () => close(modalId),
      status,
      openDuration,
      closeDuration,
      ...args,
    },
  ),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [status, args]);
  return (
    <Modal>
      <ModalInner>
        <ModalBackground onClick={() => close(modalId)} />
        {modal}
      </ModalInner>
    </Modal>
  );
});

ModalComponent.propTypes = {
  render: PropTypes.func,
  args: PropTypes.any,
  close: PropTypes.func,
  modalId: PropTypes.string,
  status: PropTypes.number,
  closeDuration: PropTypes.number,
  openDuration: PropTypes.number,
};


export const showModalGenerator = (props) => (args) => {
  const {
    showModal,
    renderModal,
    closeDuration,
    openDuration,
    animationDuration,
    closeModal,
    blur,
  } = props;
  return showModal((modalId, status, [openD, closeD]) => (
    <ModalComponent
      key={modalId}
      modalId={modalId}
      render={renderModal}
      status={status}
      args={args}
      openDuration={openD}
      closeDuration={closeD}
      close={() => closeModal(modalId)}
    />
  ),
  openDuration || animationDuration, closeDuration || animationDuration, blur);
};

const SimpleModalComponent = ({ children, ...props }) => (
  <ModalConsumer>
    {
      ([showModal, closeModal]) => children(() => showModalGenerator({
        showModal,
        closeModal,
        ...props,
      })())
    }
  </ModalConsumer>
);

SimpleModalComponent.propTypes = {
  children: PropTypes.func,
};
export default SimpleModalComponent;
