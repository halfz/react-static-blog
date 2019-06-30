import { MOBILE_WIDTH } from 'const';
import styled from 'styled-components';


const MobileOnly = styled.div`
  display: none;
  
  @media (max-width: ${MOBILE_WIDTH}) {
    display: unset;
  }
`;

export default MobileOnly;
