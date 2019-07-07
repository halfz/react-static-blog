import { Link } from '@reach/router';
import Colors from 'assets/color';
import JPGs from 'assets/jpg';
import Breadcrumb from 'components/Shared/Breadcrumb';
import Footer from 'components/Shared/Footer';
import Menu from 'components/Shared/Menu';
import Title from 'components/Shared/Title';
import { MOBILE_WIDTH } from 'const';
import { useComponentDidMount } from 'halfz/react-hook-ex';
import moment from 'moment';
import { Wrapper } from 'pages';
import React, { useMemo } from 'react';
import Highlight from 'react-highlight';
import ReactMarkdown from 'react-markdown';
import filter from 'lodash/filter';
import {
  Head,
  useRouteData,
} from 'react-static';
import styled from 'styled-components';

export const MarkDownWrapper = styled.div`
  width: 900px;
  border-radius: 5px;
  background-color: ${Colors.whiteFe};
  display: flex;
  flex-direction: column;
  padding: 70px 70px;
  padding-top: 20px;
  
  @media (max-width: ${MOBILE_WIDTH}) {
    width: 100%;
    margin: 0;
    padding: 16px;
  }
`;


const MarkDown = styled(ReactMarkdown)`
  font-size: 14px;
  width: 100%;
  color: ${Colors.greyishBrown};
  word-break: break-word;
  line-height: 2em;
  
  img {
    max-width: 720px;
      
    @media (max-width: ${MOBILE_WIDTH}) {
      max-width: 100%;
    }
  }
  
  ul,
  ol {
    padding-inline-start: 20px;
  }
  
  h1 {
    margin-top: 60px;
    margin-bottom: 10px;
  }
  
  h2 {
    margin-top: 50px;
    margin-bottom: 10px;
  }
  
  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  a {
    color: ${Colors.unicorn};
    text-decoration: none;
  }
`;

const BlackCode = styled.code`
  background-color: ${Colors.greyishBrown};
  color: #c5c8c6;
  font-weight: bold;
`;
const Info = styled.div`
  text-align: right;
  align-items: center;
  font-weight: normal;
  font-size: 15px;
  width: 100%;
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
function RouterInlineCode({ children }) {
  return <BlackCode>{children}</BlackCode>;
}


// eslint-disable-next-line react/prop-types
function Code({ language, value }) {
  return (
    <Highlight language={language}>
      {value}
    </Highlight>
  );
}

// eslint-disable-next-line react/prop-types
function Image({ src, alt }) {
  if (!src.startsWith('http')) {
    // eslint-disable-next-line global-require
    return <img src={require(`../../data/post/${src.substr(2)}`)} alt={alt} />;
  }
  return <img src={src} alt={alt} />;
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

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
  
  @media (max-width: ${MOBILE_WIDTH}) {
    flex-direction: column;
  }
`;

export const Main = styled.div`
  display: flex;
  max-width: 900px;
  margin: 16px auto;
  flex-direction: column;
  
  @media (max-width: ${MOBILE_WIDTH}) {
    margin-left: 10px;
    margin-right: 10px;
  }
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
  useComponentDidMount(() => {
    if (typeof FB !== 'undefined') {
      // eslint-disable-next-line no-undef
      FB.XFBML.parse();
    }
  });
  const url = `https://halfz.github.io/post/${post.id}`;
  return (
    <Wrapper>
      <Menu />
      <Head>
        <meta charSet="UTF-8" />
        <title>
          {post.title}
          {' - HALFZ 기술 블로그'}
        </title>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:tag" content={post.tags ? post.tags.join(', ') : ''} />
        <meta property="article:section " content={post.category ? post.category : 'All'} />
        <meta property="article:published_time" content={date} />
      </Head>
      <Title title={post.title} />
      <Breadcrumb data={breadcrumbData} />
      <Main>
        <script type="application/ld+json">
          {
            JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsArticle',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': url,
              },
              headline: post.title,
              // eslint-disable-next-line global-require
              image: filter(post.images.map((src) => require(`../../data/post/${src.substr(2)}`)), (v) => !v.startsWith('data')),
              datePublished: moment(post.date).format(),
              dateModified: moment(post.date).format(),
              author: {
                '@type': 'Person',
                name: post.author.name,
              },
              publisher: {
                '@type': 'Organization',
                name: 'HALFZ',
                logo: {
                  '@type': 'ImageObject',
                  url: `${JPGs.HALFZLogo}`,
                },
              },
              description: '하프스는 스타트업&투자자 AI 매칭 플랫폼 서비스 넥스트 유니콘을 제공합니다.',
            })
          }
        </script>

        <MarkDownWrapper>
          <MarkDown
            source={`${post.markdown}`}
            renderers={{
              link: RouterLink,
              code: Code,
              image: Image,
              inlineCode: RouterInlineCode,
            }}
          />
          <Row>
            <div>
              <div
                className="fb-like"
                data-href={url}
                data-width=""
                data-layout="button_count"
                data-action="like"
                data-size="small"
                data-show-faces="true"
                data-share="true"
              />
              <div className="fb-save" data-uri={url} data-size="small" />
            </div>
            <Info>
              <Date>{date}</Date>
              &nbsp;&nbsp;by&nbsp;
              <Author to={`/author/${post.author.id}`}>
                {post.author.name}
              </Author>
              {post.author.profileBase64 ? <AuthorProfile src={post.author.profileBase64} /> : null}
            </Info>
          </Row>
          <Row>
            <div className="fb-comments" data-href={url} data-width="100%" data-numposts="5" />
          </Row>
        </MarkDownWrapper>
      </Main>
      <Footer />
    </Wrapper>
  );
}
