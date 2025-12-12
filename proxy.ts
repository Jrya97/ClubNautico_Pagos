import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/estado_cuenta")) {
        const authCookie = request.cookies.get("auth_session");

        if (!authCookie) {
            const loginUrl = new URL("/", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/estado_cuenta/:path*",
};
