import type { NextPage } from 'next';
import Button from '@components/button';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { Post } from '@prisma/client';

interface WriteForm {
  question: string;
}

interface WriteMutation {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { register, handleSubmit, watch } = useForm();
  const [writePost, { loading }] = useMutation<WriteMutation>(
    '/api/community/write',
  );

  const onValid = (data: WriteForm) => {
    if (loading) return;
    writePost(data);
  };

  watch('question');

  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <TextArea
          register={register('question', { required: true })}
          required
          placeholder="Ask a question!"
        />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
