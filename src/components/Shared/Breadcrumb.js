import { Colors } from 'assets';
import { MOBILE_WIDTH } from 'const';
import startCase from 'lodash/startCase';
import * as PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import useLocation from 'utils/useLocation';


const Wrapper = styled.div`
  height: 40px;
  width: 100%;
  background-color: ${Colors.whiteFe};
  display: flex;
  padding-left: 72px;
  align-items: center;
  border-bottom: ${Colors.whiteEA} 1px solid;

  @media (max-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;

const Each = styled.div`
  height: 20px;
  font-size: 14px;
  letter-spacing: -0.5px;
  color: ${Colors.greyishBrown};
  cursor: ${(props) => props.disabled ? `default` : `pointer`};

  & + & {
    ::before {
      content: '>';
      font-size: 14px;
      letter-spacing: -0.5px;
      color: ${Colors.pinkishGrey};
      margin-right: 18px;
      cursor: default;
    }

    margin-left: 18px;
  }
`;
/*
<ol itemscope itemtype="https://schema.org/BreadcrumbList">
  <li itemprop="itemListElement" itemscope
      itemtype="https://schema.org/ListItem">
    <a itemtype="https://schema.org/Thing"
       itemprop="item" href="https://example.com/books">
        <span itemprop="name">Books</span></a>
    <meta itemprop="position" content="1" />
  </li>
  ›
  <li itemprop="itemListElement" itemscope
      itemtype="https://schema.org/ListItem">
    <a itemtype="https://schema.org/Thing"
       itemprop="item" href="https://example.com/books/sciencefiction">
      <span itemprop="name">Science Fiction</span></a>
    <meta itemprop="position" content="2" />
  </li>
  ›
  <li itemprop="itemListElement" itemscope
      itemtype="https://schema.org/ListItem">
    <a itemtype="https://schema.org/Thing"
       itemprop="item" href="https://example.com/books/sciencefiction/ancillaryjustice">
      <span itemprop="name">Ancillary Justice</span></a>
    <meta itemprop="position" content="3" />
  </li>
</ol>

* */
const Breadcrumb = ({ data }) => {
  const { navigate } = useLocation();
  return (
    <Wrapper itemscope itemtype="https://schema.org/BreadcrumbList">
      {data ? data.map((v, i) => (
        <Each
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"

          key={i.toString()}
          disabled={!v.link}
          onClick={() => v.link ? navigate(v.link) : null}
        >
          {startCase(v.title)}
        </Each>
      )) : null}
    </Wrapper>
  );
};

Breadcrumb.propTypes = {
  data: PropTypes.any,
};


export default Breadcrumb;
