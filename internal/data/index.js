const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const yaml = require('js-yaml');
const sharp = require('sharp');

const loadData = async () => {
  const tags = {};
  const categories = {};
  const authorPosts = {};

  const loadAuthor = async () => {
    const Authors = {};
    const authors = fs.readdirSync(path.join(process.cwd(), './data/author'));
    for (let i = 0; i < authors.length; i += 1) {
      const authorId = authors[i];
      const authorData = {};
      const author = fs.readdirSync(path.join(process.cwd(), `./data/author/${authorId}`));
      if (!_.includes(author, 'about.md')) {
        throw new Error(`${authorId}/about.md is not exists.`);
      }

      let aboutMD = fs.readFileSync(path.join(process.cwd(), `./data/author/${authorId}/about.md`), { encoding: 'utf-8' });
      aboutMD = _.trim(aboutMD);
      const end = aboutMD.indexOf('--->');
      if (end === -1 || !aboutMD.startsWith('<!---')) {
        throw new Error(`${authorId}/about.md does not have meta data
<!--- 
display_name: XXX XXX
 --->`);
      }
      const parsed = yaml.safeLoad(_.trim(aboutMD.substr(5, end - 5)));

      _.merge(authorData, parsed);
      authorData.markdown = _.trim(aboutMD.substr(end + 5));

      if (_.includes(author, 'profile.jpg')) {
        // eslint-disable-next-line no-await-in-loop
        authorData.profileBase64 = `data:image/jpg;base64,${(await sharp(path.join(process.cwd(), `./data/author/${authorId}/profile.jpg`)).resize(200).toBuffer()).toString('base64')}`;
      }

      authorData.id = encodeURI(authorId);
      Authors[authorId] = authorData;
    }
    return Authors;
  };

  const loadPosts = async (authors) => {
    const Posts = [];
    const posts = fs.readdirSync(path.join(process.cwd(), './data/post'));
    _.forEach(posts, (postName) => {
      let postKey = postName.substr(0, _.lastIndexOf(postName, '.'));
      postKey = _.replace(postKey, /[^a-zA-Z0-9_-]+/g, '');
      let postfix = 0;
      const postKeyBase = postKey;
      while (postKey in Posts) {
        postfix += 1;
        postKey = postKeyBase + postfix;
      }
      if (!postKey) {
        return;
      }
      const postData = {};

      let post = fs.readFileSync(path.join(process.cwd(), `./data/post/${postName}`), { encoding: 'utf-8' });
      post = _.trim(post);
      const end = post.indexOf('--->');
      if (end === -1 || !post.startsWith('<!---')) {
        throw new Error(`${post} does not have meta data
<!--- 
title: 테스트
date: 2019-06-25
description: 테스트입니다.
author: mark
tags: 테스트, test
 --->`);
      }

      const parsed = yaml.safeLoad(_.trim(post.substr(5, end - 5)));

      _.merge(postData, parsed);
      postData.markdown = _.trim(post.substr(end + 5));

      postData.id = postKey;

      if (typeof postData.tags === 'string') {
        postData.tags = postData.tags.split(',').map((v) => _.trim(v));
      }
      if (postData.tags) {
        postData.tags.forEach((tag) => {
          if (!(tag in tags)) {
            tags[tag] = [];
          }
          tags[tag].push(postData);
        });
      }
      postData.author = authors[postData.author];

      if (postData.category) {
        if (!(postData.category in categories)) {
          categories[postData.category] = [];
        }
        categories[postData.category].push(postData);
      }
      if (!(postData.author.id in authorPosts)) {
        authorPosts[postData.author.id] = [];
      }
      authorPosts[postData.author.id].push(postData);
      Posts.push(postData);
    });

    return _.orderBy(Posts, ['date', 'title'], ['desc', 'asc']);
  };

  const authors = await loadAuthor();
  const posts = await loadPosts(authors);
  return {
    authors,
    posts,
    categories,
    tags,
    authorPosts,
  };
};
export default loadData;
