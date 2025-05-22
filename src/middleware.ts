import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Handle redirect for authenticated users trying to access login/register pages
    if (
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")
    ) {
      if (req.nextauth.token) {
        return NextResponse.redirect(new URL("/dashboard/drafts", req.url));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow public access to login, register, and design pages
        if (
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname.startsWith("/register") ||
          req.nextUrl.pathname.startsWith("/design") ||
          req.nextUrl.pathname === "/"
        ) {
          return true;
        }
        // Require authentication for dashboard routes
        return !!token;
      },
    },
  }
);

// Specify which routes should be protected
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/design"],
};
