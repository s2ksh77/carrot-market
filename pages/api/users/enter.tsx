import twilio from 'twilio';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.MES_SEV_ID,
      to: process.env.PHONE_NUMBER!,
      body: `Your login token is ${payload}`,
    });
  }

  console.log(token);

  return res.json({ ok: true });
}

export default withHandler('POST', handler);

// 일반적인 방법이었었지
/** if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log('found it');
    if (!user) {
      user = await client.user.create({
        data: {
          name: 'Anonymous',
          email,
        },
      });
    }
    console.log(user);
  }
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log('found it');
    if (!user) {
      user = await client.user.create({
        data: {
          name: 'Anonymous',
          phone: +phone,
        },
      });
    }
    console.log(user);
  }*/

// 유저만 찾거나 만들 때
/**   const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: 'Anonymous',
      ...payload,
    },
    update: {},
  }); */
