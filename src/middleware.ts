import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { SITE_COOKIE_KEY } from "./lib/constants";
import { urls } from "./lib/urls";

export function middleware(req: NextRequest) {
  const session = req.cookies.get(SITE_COOKIE_KEY)?.value;

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith(urls.GOOGLE_REDIRECT_URI)) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL(urls.AUTH, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
