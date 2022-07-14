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
    session: { user },
  } = req;

  const roomInfo = await client.chatRoom.findFirst({
    where: {
      id: +id.toString(),
    },
    include: {
      messages: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  res.json({ ok: true, roomInfo });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
    isPrivate: false,
  }),
);
