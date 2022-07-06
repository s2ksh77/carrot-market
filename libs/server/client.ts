/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();
// { log: ['query']} 로그 확인할 때

if (process.env.NODE_ENV === 'development') global.client = client;

export default client;
