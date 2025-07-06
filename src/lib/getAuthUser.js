import {cookies} from "next/headers";
import {decrypt} from "./sessions";

export default async function getAuthUser() {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")?.value;
    if (session) {
        return await decrypt(session);
    }
}