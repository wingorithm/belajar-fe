import "server-only"
import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(encodeKey)
}

export async function decrypt(session) {
    try {
        const {payload} = await jwtVerify(session, encodeKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (e) {
        console.log("fail to verify session");
    }
}

export async function createSession(userId) {
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({userId, expiredAt});
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expiredAt : expiredAt,
        path: "/",
        sameSite: "lax",
    });
}