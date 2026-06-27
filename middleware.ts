import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function middleware(request: any) {
  const session = await getServerSession(authConfig);
  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
