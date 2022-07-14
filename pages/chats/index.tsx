import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '@components/layout';
import useSWR from 'swr';
import { ChatRoom, Message, User } from '@prisma/client';
import { getRoomName } from '@libs/client/utils';
import useUser from '@libs/client/useUser';

interface ChatRoomWithUserAndMessage extends ChatRoom {
  user: User;
  message: Message;
}
interface ChatRoomResponse {
  ok: boolean;
  chatRooms: ChatRoomWithUserAndMessage[];
}

const Chats: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<ChatRoomResponse>('/api/chats');
  return (
    <Layout hasTabBar title="채팅">
      <div className="divide-y-[1px] ">
        {data?.chatRooms?.map(room => (
          <Link href={`/chats/${room?.id}`} key={room?.id}>
            <a className="flex px-4 cursor-pointer py-3 items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-gray-700">{getRoomName(room, user?.id)}</p>
                <p className="text-sm  text-gray-500">
                  {room?.message?.message}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
