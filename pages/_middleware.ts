import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname, origin } = req.nextUrl;
  // if (req.ua?.isBot) {
  //   return new Response("Plz don't be a bot be a human", { status: 403 });
  // }
  if (!req.url.includes('/api')) {
    if (!req.url.includes('/enter') && !req.cookies.carrotmarket) {
      return NextResponse.redirect(`${origin}/enter`);
    }
  }
}
