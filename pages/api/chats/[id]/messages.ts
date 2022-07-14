import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    query: { id },
    body: { message, chatRoomId },
    session: { user },
  } = req;

  const newMessage = await client.message.create({
    data: {
      message,
      user: {
        connect: {
          id: user?.id,
        },
      },
      chatRoom: {
        connect: {
          id: +chatRoomId.toString(),
        },
      },
    },
  });

  return res.json({
    ok: true,
    newMessage,
  });
}

export default withApiSession(withHandler({ methods: ['POST'], handler }));
