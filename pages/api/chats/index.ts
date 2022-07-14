import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    body: { productId, id },
    session: { user },
  } = req;

  if (req.method === 'GET') {
    const chatRooms = await client.chatRoom.findMany({
      include: {
        user: true,
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
    res.json({
      ok: true,
      chatRooms,
    });
  }
  if (req.method === 'POST') {
    const alreadyChatRoom = await client.chatRoom.findFirst({
      where: {
        product: {
          id: +productId.toString(),
        },
        user: {
          id,
        },
      },
    });
    if (alreadyChatRoom) {
      res.json({ ok: true, chatRoom: alreadyChatRoom });
    } else {
      const chatRoom = await client.chatRoom.create({
        data: {
          product: {
            connect: {
              id: +productId.toString(),
            },
          },
          user: {
            connect: {
              id,
            },
          },
        },
      });
      res.json({ ok: true, chatRoom });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler }),
);
