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

  if (req.method === 'GET') {
    const profile = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    res.json({ ok: true, profile });
  }
  if (req.method === 'POST') {
    const {
      session: { user },
      body: { email, phone, name, avatarId },
    } = req;

    const userInfo = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (email && email !== userInfo?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        }),
      );
      if (alreadyExists)
        res.json({ ok: false, error: '이미 사용중인 이메일 입니다.' });
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
      res.json({ ok: true });
    }
    if (phone && phone !== userInfo?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
          select: {
            id: true,
          },
        }),
      );
      if (alreadyExists)
        res.json({ ok: false, error: '이미 사용중인 핸드폰 번호 입니다.' });
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      });
      res.json({ ok: true });
    }
    if (name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
    }
    if (avatarId) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          avatar: avatarId,
        },
      });
    }
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler }),
);
