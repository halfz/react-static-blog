import { Link } from '@reach/router';
import Colors from 'assets/color';
import Breadcrumb from 'components/Shared/Breadcrumb';
import Footer from 'components/Shared/Footer';
import Menu from 'components/Shared/Menu';
import Title from 'components/Shared/Title';
import { MOBILE_WIDTH } from 'const';
import moment from 'moment';
import {
  Main,
  Wrapper,
} from 'pages';
import React, { useMemo } from 'react';
import Highlight from 'react-highlight';
import ReactMarkdown from 'react-markdown';
import { useRouteData } from 'react-static';
import styled from 'styled-components';

export const MarkDownWrapper = styled.div`
  width: 900px;
  border-radius: 5px;
  background-color: ${Colors.whiteFe};
  display: flex;
  flex-direction: column;
  padding: 70px 70px;
  
  @media (max-width: ${MOBILE_WIDTH}) {
    width: 100%;
    margin: 0;
    padding: 16px;
  }
`;


const MarkDown = styled(ReactMarkdown)`
  font-size: 14px;
  width: 100%;
  color: ${Colors.black33};
  word-break: break-word;
  
  img {
    max-width: 760px;
      
    @media (max-width: ${MOBILE_WIDTH}) {
      max-width: 100%;
    }
  }
  
  ul ol {
    padding-inline-start: 20px;
  }
  
  a {
    color: ${Colors.unicorn};
  }
`;

const Info = styled.h5`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: normal;
  margin: 20px 0;
`;

// eslint-disable-next-line react/prop-types
function RouterLink({ href, children }) {
  return (
    href.match(/^([a-zA-Z]+?:)/)
      ? <a href={href} target="_blank">{children}</a>
      : <Link to={href}>{children}</Link>
  );
}

// eslint-disable-next-line react/prop-types
function Code({ language, value }) {
  return (
    <Highlight language={language}>
      {value}
    </Highlight>
  );
}

const Author = styled(Link)`
  color: ${Colors.greyishBrown};
`;
const AuthorProfile = styled.img`
  margin-left: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;
const Date = styled.span`
  color: ${Colors.pinkishGrey};
`;
export default function Post() {
  const { post } = useRouteData();
  const date = useMemo(() => moment(post.date).format('YYYY-MM-DD'), [post.date]);

  const breadcrumbData = [
    {
      title: 'Home',
      link: '/',
    }, {
      title: 'Post',
    }, {
      title: post.title,
    },
  ];
  return (
    <Wrapper>
      <Menu />
      <Title title={post.title} />
      <Breadcrumb data={breadcrumbData} />
      <Main>
        <MarkDownWrapper>
          <Info>
            <Date>{date}</Date>
            &nbsp;&nbsp;by&nbsp;
            <Author to={`/author/${post.author.id}`}>
              {post.author.name}
            </Author>
            {post.author.profileBase64 ? <AuthorProfile src={post.author.profileBase64} /> : null}
          </Info>
          <MarkDown
            source={`${post.markdown}`}
            renderers={{
              link: RouterLink,
              code: Code,
            }}
          />
        </MarkDownWrapper>
      </Main>
      <Footer />
    </Wrapper>
  );
}
