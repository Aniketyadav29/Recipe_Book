import { NextResponse } from "next/server";
import {
    ADMIN_COOKIE_NAME,
    ADMIN_SESSION_TTL_MS,
    createAdminSession,
    getAdminLoginHint,
    isValidAdminCredential,
} from "@/lib/adminAuth";

export async function GET() {
    return NextResponse.json(getAdminLoginHint());
}

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        if (!isValidAdminCredential(username, password)) {
            return NextResponse.json(
                { error: "Invalid admin username or password." },
                { status: 401 }
            );
        }

        const sessionToken = await createAdminSession(String(username).trim());
        const response = NextResponse.json({ ok: true });

        response.cookies.set({
            name: ADMIN_COOKIE_NAME,
            value: sessionToken,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: ADMIN_SESSION_TTL_MS / 1000,
            path: "/",
        });

        return response;
    } catch {
        return NextResponse.json(
            { error: "Unable to log in right now." },
            { status: 400 }
        );
    }
}
