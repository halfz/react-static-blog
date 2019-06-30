import { Link } from '@reach/router';
import { Colors } from 'assets';
import JPGs from 'assets/jpg';
import Svgs from 'assets/svg';
import DesktopOnly from 'components/Common/DesktopOnly';
import MobileOnly from 'components/Common/MobileOnly';
import { WindowStatusConsumer } from 'components/Context/WindowStatusContext';
import MobileMenu from 'components/Shared/MobileMenu';
import {
  MOBILE_SMALL_WIDTH,
  MOBILE_WIDTH,
  Z_INDEX,
} from 'const';
import { useShowModal } from 'halfz/react-simple-modal';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styled from 'styled-components';
import { propsIf } from 'utils/styledComponentEx';

const HeaderWrapper = styled.div`
  height: ${(props) => (props.main) ? '72px' : '52px'};
  width: 100%;

  @media (max-width: ${MOBILE_WIDTH}) {
    height: 46px;
  }
`;
const HeaderInner = styled.div`
  width: 100%;
  height: ${(props) => (props.main) ? '72px' : '52px'};
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: ${Z_INDEX.NAV_MEMU};
  ${propsIf('transparent', () => `background-color: transparent;`, () => `background-color: ${Colors.whiteFe}`)};
  ${propsIf('transparent', null, () => `border-bottom: solid 1px ${Colors.greyD1};`)};
  ${propsIf('transparent', null, () => `height: 52px`)};
  transition-duration: 0.3s;

  @media (max-width: ${MOBILE_WIDTH}) {
    height: 46px;
    transition-duration: 0s;
  }
`;
const HeaderLeft = styled(Link)`
  height: ${(props) => (props.main) ? '72px' : '52px'};
  display: flex;
  font-size: 28px;
  text-decoration: none;
  align-items: center;
  font-weight: bold;
  justify-content: left;
  color: ${Colors.unicorn};
  margin-left: 40px;

  @media (max-width: ${MOBILE_WIDTH}) {
    margin-left: 24px;
  }
  
  @media (max-width: ${MOBILE_SMALL_WIDTH}) {
    margin-left: 24px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  font-size: 14px;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  color: ${propsIf('transparent', Colors.whiteFe, Colors.black33)};
  margin-right: 40px;
  
  @media (max-width: ${MOBILE_WIDTH}) {
    margin-right: 24px;
  }
`;

const BlogText = styled.a`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: ${propsIf('transparent', Colors.whiteFe, Colors.black33)};
`;

const Logo = styled.img`
  height: 24px;
  margin-right: 10px;
  
  @media (max-width: ${MOBILE_SMALL_WIDTH}) {
    height: 20px;
  }
`;
const MobileButton = styled.div`
  height: 46px;
  width: 46px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;
const Comp = memo(({ transparent, main }) => {
  const showMenu = useShowModal(
    ({ close, status, openDuration, closeDuration }) => <MobileMenu close={close} status={status} durations={[openDuration, closeDuration]} />,
    true,
    0.3,
  );
  return (
    <HeaderWrapper main={main}>
      <HeaderInner transparent={transparent} main={main}>
        <HeaderLeft to="/">
          <Logo src={JPGs.HALFZLogo} />
          기술 블로그
        </HeaderLeft>
        <HeaderRight>
          <DesktopOnly>
            <BlogText
              href="https://www.nextunicorn.kr"
              target="_blank"
            >
              <Svgs.NULogo />
            </BlogText>
          </DesktopOnly>
          <MobileOnly>
            <MobileButton
              onClick={() => showMenu()}
            >
              <Svgs.MobileMenu
                theme={{
                  '#FEFEFE': Colors.greyishBrown,
                }}
              />
            </MobileButton>
          </MobileOnly>
        </HeaderRight>
      </HeaderInner>
    </HeaderWrapper>
  );
});

Comp.propTypes = {
  main: PropTypes.any,
  transparent: PropTypes.any,
};

const Menu = (props) => (
  <WindowStatusConsumer>
    {({ Y }) => <Comp {...props} transparent={props.transparent && Y <= 0} />}
  </WindowStatusConsumer>
);

Menu.propTypes = {
  transparent: PropTypes.bool,
  main: PropTypes.bool,
};


export default Menu;
