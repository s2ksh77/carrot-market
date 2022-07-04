import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {

  const {
    query : { id },
    session: {user}
  } = req;

  const alreadyExist = await client.wondering.findFirst({
    where:{
      userId: user?.id,
      postId: +id.toString(),
    }
  })

  if(alreadyExist){
    //delete
    await client.wondering.delete({
      where:{
        id: alreadyExist.id,
      }
    })
  }else {
    // create
    await client.wondering.create({
      data:{
        user:{
          connect:{
            id: user?.id
          }
        },
        post:{
          connect:{
            id: +id.toString(),
          }
        }
      }
    })
  }


  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
    isPrivate: false,
  }),
);
