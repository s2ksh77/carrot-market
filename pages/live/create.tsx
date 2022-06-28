import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import TextArea from '@components/textarea';

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="라이브 하기">
      <form className=" space-y-4 py-10 px-4">
        <Input required label="이름" name="name" type="text" />
        <Input required label="가격" name="price" type="text" kind="price" />
        <TextArea name="description" label="설명" />
        <Button text="라이브 하기" />
      </form>
    </Layout>
  );
};

export default Create;
