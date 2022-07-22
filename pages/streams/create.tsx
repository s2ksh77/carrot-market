import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { Stream } from '@prisma/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface CreateForm {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateForm>();
  const [createStream, { loading, data }] =
    useMutation<CreateResponse>(`/api/streams`);

  const onValid = (form: CreateForm) => {
    if (loading) return;
    createStream(form);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data?.stream.id}`);
    }
  }, [data]);

  return (
    <Layout canGoBack title="라이브 하기">
      <form onSubmit={handleSubmit(onValid)} className=" space-y-4 py-10 px-4">
        <Input
          required
          register={register('name', { required: true })}
          label="이름"
          name="name"
          type="text"
        />
        <Input
          required
          register={register('price', { required: true, valueAsNumber: true })}
          label="가격"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea
          register={register('description', { required: true })}
          name="description"
          label="설명"
        />
        <Button text={loading ? '로딩 중' : '라이브 하기'} />
      </form>
    </Layout>
  );
};

export default Create;
