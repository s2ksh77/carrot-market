import type { NextRequest, NextFetchEvent } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log('chats only middleware');
  console.log(req.ua);
}
