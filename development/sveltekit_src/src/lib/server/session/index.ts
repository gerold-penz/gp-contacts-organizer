import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { Session } from "$lib/interfaces"
import type { RequestEvent } from "@sveltejs/kit"


const BSKV_SESSIONS_PATH = path.resolve(path.join(env.BSKV_DIR, "sessions.sqlite"))
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30
const db = new BunSqliteKeyValue(BSKV_SESSIONS_PATH)


export async function createSession(userUuid: string): Promise<Session> {

    const token = crypto.randomUUID()
    const session: Session = {
        token,
        userUuid,
        expiresAt: new Date(Date.now() + SESSION_TTL_MS)
    }

    db.set<Session>(token, session, SESSION_TTL_MS)

    return session
}


export async function validateSessionToken(token: string): Promise<Session | undefined> {
    const session = db.get<Session>(token)
    if (session === undefined) {
        return
    }

    if (Date.now() >= session.expiresAt.getTime()) {
        db.delete(token)
        return
    }

    if (Date.now() >= session.expiresAt.getTime() - (SESSION_TTL_MS / 2)) {
        session.expiresAt = new Date(Date.now() + SESSION_TTL_MS)
        db.set<Session>(token, session, SESSION_TTL_MS)
    }

    return session
}


export async function invalidateSession(token: string): Promise<void> {
    db.delete(token)
}


export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
    event.cookies.set("session", token, {
        httpOnly: true,
        sameSite: "lax",
        expires: expiresAt,
        path: "/"
    })
}


export function deleteSessionTokenCookie(event: RequestEvent): void {
    event.cookies.set("session", "", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 0,
        path: "/"
    })
}
