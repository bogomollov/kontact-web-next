import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const publicRoutes = ["/login", "/register"];
const protectedRoutes = ["/dashboard", "/admin", "/profile", "/saved"];

function isJWT(token: string | undefined): boolean {
  return !!token && token.split(".").length === 3;
}

export default async function middleware(req: NextRequest) {
  const cookiesStore = await cookies();
  const cookie = cookiesStore.get("session")?.value;
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);

  if (cookie) {
    if (!isJWT(cookie)) {
      cookiesStore.delete("session");
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    if (isPublicRoute && path !== "/dashboard") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  } else if (isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
