import type { NextPage } from 'next';
import Button from '@components/button';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { Post } from '@prisma/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useCoords from '@libs/client/useCoords';

interface WriteForm {
  question: string;
}

interface WriteMutation {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [writePost, { loading, data }] =
    useMutation<WriteMutation>('/api/posts');

  const onValid = (data: WriteForm) => {
    if (loading) return;
    writePost({ ...data, latitude, longitude });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="글쓰기">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <TextArea
          register={register('question', { required: true, minLength: 5 })}
          placeholder="질문을 작성 해주세요."
        />
        <Button text={loading ? '로딩 중' : '글 올리기'} />
      </form>
    </Layout>
  );
};

export default Write;
