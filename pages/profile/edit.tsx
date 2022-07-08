import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import { getImageSrc } from '@libs/client/utils';

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const [avatarPreview, setAvatarPreview] = useState('');
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>();

  const [editProfile, { loading, data }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  useEffect(() => {
    if (user?.name) setValue('name', user?.name);
    if (user?.email) setValue('email', user?.email);
    if (user?.phone) setValue('phone', user?.phone);
    if (user?.avatar) setAvatarPreview(getImageSrc(user?.avatar, 'avatar'));
  }, [user, setValue]);

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === '' && phone === '' && name === '')
      return setError('formErrors', {
        message: '이름 혹은 이메일이나 핸드폰 번호를 입력하세요.',
      });

    if (avatar && avatar.length > 0 && user) {
      // cloudflare url
      const { uploadURL } = await (await fetch(`/api/files`)).json();

      const form = new FormData();
      form.append('file', avatar[0], user?.id + '');
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      editProfile({ email, phone, name, avatarId: id });
    } else {
      editProfile({ email, phone, name });
    }
  };

  useEffect(() => {
    if (data && !data.ok && data.error) {
      return setError('formErrors', { message: data.error });
    }
  }, [data, setError]);

  useEffect(() => {
    if (data?.ok === true) {
      router.push(`/profile`);
    }
  }, [data, router]);

  const avatar = watch('avatar');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout canGoBack title="프로필 수정">
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            변경
            <input
              {...register('avatar')}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          required={false}
          register={register('name')}
          label="이름"
          name="name"
          type="text"
        />
        <Input
          required={false}
          register={register('email')}
          label="이메일 주소"
          name="email"
          type="email"
        />
        <Input
          required={false}
          register={register('phone')}
          label="핸드폰 번호"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-medium block text-center">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={loading ? '로딩 중' : '프로필 수정'} />
      </form>
    </Layout>
  );
};

export default EditProfile;
