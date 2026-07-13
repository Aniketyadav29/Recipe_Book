export const ADMIN_COOKIE_NAME = "recipebook_admin_session";
export const ADMIN_SESSION_TTL_MS = 1000 * 60 * 60 * 8;

const encoder = new TextEncoder();

function getAdminUsername() {
    return process.env.ADMIN_USERNAME || "admin";
}

function getAdminPassword() {
    return process.env.ADMIN_PASSWORD || "recipebook123";
}

function getSessionSecret() {
    return (
        process.env.ADMIN_SESSION_SECRET ||
        `${getAdminUsername()}:${getAdminPassword()}:recipebook-local-session`
    );
}

function toHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

async function signValue(value) {
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(getSessionSecret()),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
    return toHex(signature);
}

function encodePayload(payload) {
    return btoa(JSON.stringify(payload))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
}

function decodePayload(value) {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    return JSON.parse(atob(padded));
}

export function getAdminLoginHint() {
    return {
        username: getAdminUsername(),
        usesDefaultPassword: !process.env.ADMIN_PASSWORD,
    };
}

export function isValidAdminCredential(username, password) {
    return (
        String(username || "").trim() === getAdminUsername() &&
        String(password || "") === getAdminPassword()
    );
}

export async function createAdminSession(username) {
    const payload = {
        username,
        exp: Date.now() + ADMIN_SESSION_TTL_MS,
    };
    const encodedPayload = encodePayload(payload);
    const signature = await signValue(encodedPayload);
    return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSession(token) {
    if (!token || !token.includes(".")) return false;

    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) return false;

    const expectedSignature = await signValue(encodedPayload);
    if (signature !== expectedSignature) return false;

    try {
        const payload = decodePayload(encodedPayload);
        return Boolean(payload?.username && payload?.exp > Date.now());
    } catch {
        return false;
    }
}
