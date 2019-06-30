import { useMemo } from 'react';
import SimpleModalComponent, { showModalGenerator } from './Modal';
import ModalContainer from './ModalContainer';
import {
  MODAL_STATUS,
  ModalConsumer,
  ModalMain,
  ModalProvider,
  useModalContext,
} from './ModalContext';


const useShowModal = (renderModal, blur = true, duration) => {
  const [showModal, closeModal] = useModalContext();
  return useMemo(() => showModalGenerator({
    showModal,
    closeModal,
    renderModal,
    animationDuration: duration,
    blur,
  }), [closeModal, renderModal, showModal]);
};

export {
  MODAL_STATUS,
  ModalConsumer,
  ModalMain,
  ModalProvider,
  ModalContainer,
  useShowModal,
};
export default SimpleModalComponent;
