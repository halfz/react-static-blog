import autoBind from 'auto-bind/index';
import NamedContext from 'halfz/react-simple-context/NamedContext';
import SimpleProvider from 'halfz/react-simple-context/SimpleProvider';
import { List } from 'immutable';
import * as PropTypes from 'prop-types';
import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import IdGenerator from 'utils/IdGenerator';
import { propsIf } from 'utils/styledComponentEx';

const ModalIdGen = new IdGenerator('modal-');

export const MODAL_STATUS = {
  INIT: 0,
  APPEARING: 1,
  APPEARED: 2,
  DISAPPEARING: 3,
};

class ModalManager {
  constructor(data) {
    this.data = data;
    this.setDirty = null;
    autoBind(this);
  }

  getModalData() {
    return this.data;
  }

  // custom methods
  blurSize() {
    return this.data.filter((v) => v[5]).size;
  }

  modalClose(modalId) {
    const popElem = this.data.find((v) => v[0] === modalId);

    this.updateStatus(modalId, MODAL_STATUS.DISAPPEARING);
    setTimeout(() => {
      this.data = this.data.filter((v) => v[0] !== modalId);
      this.setDirty();
    }, popElem[4]);
    return this;
  }

  modalShow(modalId, renderer, openDuration, closeDuration, blur) {
    if (this.data.filter((v) => v[0] === modalId).size === 0) {
      this.data = this.data.push([modalId, (status) => renderer(modalId, status, [openDuration, closeDuration]), MODAL_STATUS.INIT, openDuration, closeDuration, blur]);
      setTimeout(() => this.updateStatus(modalId, MODAL_STATUS.APPEARING), 0);
      setTimeout(() => this.updateStatus(modalId, MODAL_STATUS.APPEARED), openDuration);
    }
    return this;
  }

  reset() {
    this.data = new List();
    return this;
  }

  updateStatus(modalId, status) {
    const elem = this.data.find((v) => v[0] === modalId);
    if (elem) {
      elem[2] = status;
      this.setDirty();
    }
  }
}


const ModalWrapperDiv = styled.div`
  ${propsIf('modalSize', (modalSize) => css`
  filter: blur(${10 * modalSize}px);
  overflow-y: hidden;
`)};
`;


const ModalWrapper = ({ modalSize, ...props }) => (
  <ModalWrapperDiv
    modalSize={modalSize}
    {...props}
  />
);

ModalWrapper.propTypes = {
  modalSize: PropTypes.number,
};

export const ModalProvider = (props) => (
  <SimpleProvider
    namespace="modals"
    initialValue={[new ModalManager(new List()), false]}
    {...props}
  />
);

export const useModalContext = () => {
  const [[manager, _], setModalManager] = useContext(NamedContext('modals'));
  if (manager.setDirty == null) {
    // eslint-disable-next-line no-param-reassign
    manager.setDirty = () => {
      setModalManager([manager, !_]);
    };
  }
  const closeModal = (modalId) => setModalManager([manager.modalClose(modalId), !_]);
  return [
    (renderer, openDuration, closeDuration, blur = true) => {
      const modalId = ModalIdGen.next();
      setModalManager([manager.modalShow(modalId, renderer, openDuration, closeDuration, blur), _ + 1]);
      return () => closeModal(modalId);
    },
    closeModal,
    () => manager.getModalData(),
    manager,
    () => setModalManager([manager.reset(), !_]),
  ];
};
export const ModalConsumer = (props) => {
  const [showModal, closeModal, getModalData, manager, setDirty] = useModalContext();
  return props.children(
    [showModal, closeModal, getModalData, manager, setDirty],
  );
};

export const ModalMain = (props) => (
  <ModalConsumer {...props}>
    {([, , , manager]) => (

      <ModalWrapper modalSize={manager.blurSize()}>
        {props.children}
      </ModalWrapper>
    )
    }
  </ModalConsumer>
);
ModalConsumer.propTypes = {
  children: PropTypes.func,
};

ModalMain.propTypes = {
  children: PropTypes.any,
};
