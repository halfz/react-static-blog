import { Colors } from 'assets';
import PostCard from 'components/Home/PostCard';
import Breadcrumb from 'components/Shared/Breadcrumb';
import Footer from 'components/Shared/Footer';
import Menu from 'components/Shared/Menu';
import Title from 'components/Shared/Title';
import { MOBILE_WIDTH } from 'const';
import each from 'lodash/each';
import range from 'lodash/range';
import React from 'react';
import {
  Head,
  useRouteData,
} from 'react-static';
import { TagCloud } from 'react-tagcloud';
import styled from 'styled-components';
import useLocation from 'utils/useLocation';

export const Main = styled.div`
  display: flex;
  max-width: 900px;
  margin: 16px auto;
  
  @media (max-width: ${MOBILE_WIDTH}) {
    flex-direction: column;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const PostList = styled.div`
  width: 100%;
`;

const Categories = styled.div`
  width: 280px;
  margin-left: 20px;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Colors.whiteEE};
`;

const Pagination = styled.div`
  display: inline-block;
  margin: 12px 20px;
`;

const TagTitle = styled.h3`
  color: ${Colors.unicorn};
  font-weight: bold;
`;
//
// const Category = styled(Link)`
//   margin-top: 10px;
//   text-decoration: none;
//   color: ${Colors.greyishBrown};
//   display: block;
// `;
export const MobileBr = styled.br`
  display: none;
    
  @media (max-width: ${MOBILE_WIDTH}) {
    display: initial;
  }
`;

const PageBlock = styled.a`
  float: left;
  display: inline;
  padding: 8px 16px;
  text-decoration: none;
  color: ${Colors.greyishBrown};
  ${({ active }) => active ? `color: ${Colors.whiteFe}; background-color: ${Colors.unicorn};` : null}
`;
export default () => {
  const {
    posts, currentPage, totalPages, category, tag, basePath, tags, author,
  } = useRouteData();

  const { navigate } = useLocation();

  let metaTitle = 'HALFZ 기술 블로그';
  const title = (
    <>
      HALFZ 기술 블로그
    </>
  );
  let min = 99999999;
  let max = 0;
  const tagCloudData = [];
  each(tags, (v, k) => {
    tagCloudData.push({
      value: `${k}(${v.length})`,
      key: k,
      count: v.length,
    });
    min = Math.min([min, v.length]);
    max = Math.max([max, v.length]);
  });
  const breadcrumbData = [];

  if (category) {
    metaTitle = `Category: ${author} - HALFZ 기술 블로그`;
    breadcrumbData.push({
      title: 'Home',
      link: '/',
    });
    breadcrumbData.push({
      title: `Category`,
    });
    breadcrumbData.push({
      title: `${category}`,
      link: `/category/${category}`,
    });
  }

  if (author) {
    metaTitle = `Author: ${author} - HALFZ 기술 블로그`;
    breadcrumbData.push({
      title: 'Home',
      link: '/',
    });
    breadcrumbData.push({
      title: `Author`,
    });
    breadcrumbData.push({
      title: `${author}`,
      link: `/author/${author}`,
    });
  }
  if (tag) {
    metaTitle = `Tag: ${author} - HALFZ 기술 블로그`;
    breadcrumbData.push({
      title: 'Home',
      link: '/',
    });
    breadcrumbData.push({
      title: `Tag`,
    });
    breadcrumbData.push({
      title: `${tag}`,
      link: `/tag/${tag}`,
    });
  }
  return (
    <Wrapper>
      <Head>
        <meta charSet="UTF-8" />
        <title>
          {metaTitle}
        </title>
      </Head>
      <Menu />
      <Title title={title} />
      {breadcrumbData.length > 0 ? <Breadcrumb data={breadcrumbData} /> : null}
      <Main>
        <PostList>
          {posts.map((v) => <PostCard post={v} key={v.id} />)}
          <Pagination>
            {range(totalPages).map((v) => <PageBlock active={v === (currentPage - 1)} href={`${basePath}page/${v + 1}`} key={v.toString()}>{v + 1}</PageBlock>)}
          </Pagination>
        </PostList>
        <Categories>
          <TagTitle>
            Tags
          </TagTitle>
          <TagCloud
            minSize={min}
            maxSize={max}
            tags={tagCloudData}
            onClick={({ key }) => navigate(`/tag/${key}`)}
          />
        </Categories>
      </Main>
      <Footer />
    </Wrapper>
  );
};
