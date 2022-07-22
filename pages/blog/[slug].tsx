import { readdirSync } from 'fs';
import { GetStaticProps, NextPage } from 'next';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import matter from 'gray-matter';

const Post: NextPage<{ post: string }> = ({ post }) => {
  return <>{post}</>;
};

export function getStaticPaths() {
  const files = readdirSync('./posts').map(file => {
    const [name, extension] = file.split('.');
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { content } = matter.read(`./posts/${ctx.params?.slug}.md`);

  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);

  return {
    props: {
      post: value,
    },
  };
};

export default Post;
