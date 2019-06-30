import { MOBILE_WIDTH } from 'const';
import styled from 'styled-components';


const DesktopOnly = styled.div`
  @media (max-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;

export default DesktopOnly;
