import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { SITE_COOKIE_KEY } from "./lib/constants";

export function middleware(req: NextRequest) {
  const session = req.cookies.get(SITE_COOKIE_KEY)?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/dashboard/:path*"],
};
