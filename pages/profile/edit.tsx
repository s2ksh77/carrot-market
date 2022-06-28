import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';

const EditProfile: NextPage = () => {
  return (
    <Layout canGoBack title="프로필 수정">
      <form className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            변경
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input required label="이메일 주소" name="email" type="email" />
        <Input
          required
          label="핸드폰 번호"
          name="phone"
          type="number"
          kind="phone"
        />
        <Button text="프로필 수정" />
      </form>
    </Layout>
  );
};

export default EditProfile;
