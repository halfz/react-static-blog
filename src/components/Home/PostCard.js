import { Link } from '@reach/router';
import { Colors } from 'assets';
import { MOBILE_WIDTH } from 'const';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const Title = styled.h2`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  
  a {
    text-decoration: none;
    color: ${Colors.black33};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
`;

const Info = styled.h5`
  font-size: 14px;
  font-weight: normal;
  margin: 12px 0;
  display: flex;
  
  @media (max-width: ${MOBILE_WIDTH}) {
    flex-direction: column;
  }
`;
const Date = styled.span`
  color: ${Colors.pinkishGrey};
`;
const Author = styled(Link)`
  color: ${Colors.greyishBrown};
`;
const AuthorProfile = styled.img`
  margin-left: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  
  @media (max-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;
const Description = styled.pre`
  font-size: 14px;
  word-break: break-word;
  white-space: pre-wrap;
  line-break: auto;
  text-overflow: ellipsis;
`;
const Tags = styled.p`
  font-size: 12px;
`;
const Tag = styled(Link)`
  color: ${Colors.pinkishGrey};
  text-decoration: none;
  margin-top: 15px;
  
  & + & {
    margin-left: 4px;
  }
`;

const Category = styled(Link)`
  color: ${Colors.pinkishGrey};
  font-size: 14px;
  margin-top: 15px;
`;
const Wrapper = styled.div`
  width: 100%;
  background-color: ${Colors.whiteFe};
  padding: 16px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
  
  & + & {
    margin-top: 16px;
  }
`;

const ReadMore = styled(Link)`
  cursor: pointer;
  font-weight: bold;
  border: 1px solid ${Colors.pinkishGrey};
  color: ${Colors.black33};
  padding: 12px 24px;
  display: inline-block;
  font-size: 14px;
  text-decoration: none;
`;


const PostCard = ({ post }) => {
  const date = useMemo(() => moment(post.date).format('YYYY-MM-DD'), [post.date]);
  return (
    <Wrapper>
      <Title>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
        {post.category ? (
          <Category key={post.category} to={`/category/${post.category}`}>
            {post.category}
          </Category>
        ) : null}
      </Title>
      <Description>
        {post.description}
      </Description>
      <div>
        <Tags>
          {post.tags ? post.tags.map((v) => (
            <Tag key={v} to={`/tag/${v}`}>
              #
              {v}
            </Tag>
          )) : null}
        </Tags>
      </div>
      <Row>
        <ReadMore to={`/post/${post.id}`}>READ MORE »</ReadMore>
        <Info>
          <Date>
            {date}
          </Date>
          <div>
            &nbsp;&nbsp;by&nbsp;
            <Author to={`/author/${post.author.id}`}>
              {post.author.name}
            </Author>
          </div>
          {post.author.profileBase64 ? <AuthorProfile src={post.author.profileBase64} /> : null}
        </Info>
      </Row>
    </Wrapper>
  );
};


PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
