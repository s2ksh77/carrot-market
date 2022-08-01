import { readdirSync } from 'fs';
import { GetStaticProps, NextPage } from 'next';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import matter from 'gray-matter';
import Layout from '@components/layout';

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
  return (
    <Layout title={data.title} seoTitle={data.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </Layout>
  );
};

// 1. 정적인 페이지를 만들기 위함
// static path에서 파일들을 읽어온다.
// post 하위에 두개의 파일을 읽을꺼야.
export function getStaticPaths() {
  const files = readdirSync('./posts').map(file => {
    const [name, extension] = file.split('.');
    return { params: { slug: name } }; // 이런 데이터 형식으로
  });
  return {
    paths: files, // 여기에 넘길꺼야
    fallback: false,
  };
}

// ctx 안으로 저 데이터 형식이 들어옴 { params : { slug : ''}}
// 파일 갯수만큼 불립니다. 2개의 파일이니 2번 불림
// 2개의 정적인 페이지를 만듭니다.
export const getStaticProps: GetStaticProps = async ctx => {
  const { content, data } = matter.read(`./posts/${ctx.params?.slug}.md`);

  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);

  return {
    props: {
      // 얘는 이제 serverSideProps처럼 각각의 Post의 props으로 들어가게 됨.
      data,
      post: value,
    },
  };
};

export default Post;
