import { Link } from '@reach/router';
import { Colors } from 'assets';
import Svgs from 'assets/svg';
import { MODAL_STATUS } from 'halfz/react-simple-modal';
import * as PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { propsWith } from 'utils/styledComponentEx';


const Wrapper = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 58.3%;
  background-color: ${Colors.whiteFe};
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  ${propsWith(['status', 'durations'], ([status, durations]) => {
    switch (status) {
      case MODAL_STATUS.INIT:
        return css`right: -58.3%;`;
      case MODAL_STATUS.APPEARING:
      case MODAL_STATUS.APPEARED:
        return css`transition: all ${durations[0]}ms cubic-bezier(0.82, 0.085, 0.395, 0.895); right: 0;`;
      case MODAL_STATUS.DISAPPEARING:
        return css`transition: all ${durations[1]}ms cubic-bezier(0.82, 0.085, 0.395, 0.895); right: -58.3%;`;
      default:
        return null;
    }
  })
}
`;

export const MenuLink = styled(Link)`
  font-size: 14px;
  color: ${Colors.greyishBrown};
  margin-bottom: 24px;
  text-decoration: none;
`;

export const MenuA = styled.a`
  font-size: 14px;
  color: ${Colors.greyishBrown};
  margin-bottom: 24px;
  text-decoration: none;
`;
export const Hr = styled.div`
  height: 1px;
  width: 100%;
  margin: auto;
  margin-top: 0;
  margin-bottom: 24px;
  background-color: ${Colors.whiteEA};
`;

export const Close = styled(Svgs.MobileClose)`
  padding: 4px;
  padding-right: 0;
  margin: 10.5px 0 28.5px auto;
`;
const MobileMenu = ({ close, status, durations }) => (
  <Wrapper status={status} durations={durations}>
    <Close onClick={close} />
    <Hr />
    <MenuLink
      to="/"
    >
      Home
    </MenuLink>
    <Hr />
    <MenuA
      href="https://www.nextunicorn.kr"
      target="_blank"
    >
      넥스트유니콘
    </MenuA>
  </Wrapper>
);


MobileMenu.propTypes = {
  // action: PropTypes.func,
  close: PropTypes.func,
  status: PropTypes.number,
  durations: PropTypes.arrayOf(PropTypes.number),
};


export default MobileMenu;
