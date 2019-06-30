import { Colors } from 'assets';
import JPGs from 'assets/jpg';
import { MOBILE_WIDTH } from 'const';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

export const SectionTitle = styled.div.attrs({
  style: {
    backgroundImage: `url(${JPGs.HeaderJPG})`,
  },
})`
  height: 168px;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center 60%;

  @media (max-width: ${MOBILE_WIDTH}) {
    height: 122px;
    background-position: 0 0;
  }
`;

export const TitleText = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: ${Colors.whiteFe};
  
  @media (max-width: ${MOBILE_WIDTH}) {
    font-size: 15px;
  }
`;

const Title = ({ title }) => (
  <SectionTitle>
    <TitleText>{title}</TitleText>
  </SectionTitle>
);

Title.propTypes = {
  title: PropTypes.any,
};
export default Title;
