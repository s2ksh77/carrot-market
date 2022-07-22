import type { NextPage } from 'next';
import CMessage from '@components/message';
import Layout from '@components/layout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Message, User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useUser from '@libs/client/useUser';
import useMutation from '@libs/client/useMutation';
import { getRoomName } from '@libs/client/utils';

interface MessageForm {
  message: string;
}

interface MessageWithUser extends Message {
  user: User;
}

interface Messages extends Message {
  messages: MessageWithUser[];
}

interface MessagesResponse {
  ok: boolean;
  roomInfo: Messages;
}

const ChatDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<MessagesResponse>(
    router?.query?.id ? `/api/chats/${router.query.id}` : null,
  );
  const { register, handleSubmit, reset } = useForm<MessageForm>();

  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/chats/${router.query.id}/messages`,
  );

  const onValid = (form: MessageForm) => {
    if (loading) return;
    if (form.message === '') return;
    reset();
    mutate(
      prev =>
        prev &&
        ({
          ...prev,
          roomInfo: {
            ...prev.roomInfo,
            messages: [
              ...prev?.roomInfo?.messages,
              {
                id: Date.now(),
                message: form.message,
                userId: user?.id,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false,
    );
    sendMessage({ message: form.message, chatRoomId: router.query.id });
  };

  return (
    <Layout canGoBack title={getRoomName(data?.roomInfo, user?.id.toString())}>
      <div className="py-10 pb-16 px-4 space-y-4">
        {data?.roomInfo?.messages?.map(message => (
          <CMessage
            key={message.id}
            message={message.message}
            userId={message.user?.avatar}
            reversed={message.userId === user?.id}
          />
        ))}
        <form
          onSubmit={handleSubmit(onValid)}
          className="fixed py-2 bg-white  bottom-0 inset-x-0"
        >
          <div className="flex relative max-w-md items-center  w-full mx-auto">
            <input
              {...register('message')}
              type="text"
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatDetail;
