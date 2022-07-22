import Document, { Head, Html, Main, NextScript } from 'next/document';

// Next.js 를 감싸는 document를 custom하게 변경할 수 있다.
class CustomDocument extends Document {
  render(): JSX.Element {
    console.log('DOCUMENT IS RUNNING');
    return (
      <Html lang="ko">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
