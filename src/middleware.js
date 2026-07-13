import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/adminAuth";

export async function middleware(request) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isLoggedIn = await verifyAdminSession(token);

    if (!isLoggedIn) {
        const loginUrl = new URL("/admin-login", request.url);
        loginUrl.searchParams.set("next", request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
