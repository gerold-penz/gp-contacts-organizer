import path from "node:path"
import { env } from "$env/dynamic/private"
import { BunSqliteKeyValue } from "bun-sqlite-key-value"
import type { Session } from "$lib/interfaces"
import type { Cookies } from "@sveltejs/kit"
import { SESSION_COOKIE_NAME, SESSION_TTL_MS } from "$lib/constants"


const dbPath = path.resolve(path.join(env.SQLITE_DIR, "sessions.sqlite"))
const db = new BunSqliteKeyValue(dbPath, {
    ttlMs: SESSION_TTL_MS
})


export namespace Sessions {


    export function create(userUuid: string): Session {
        console.debug(`server.sessions.Sessions.create(${userUuid})`)

        const token = crypto.randomUUID()
        const session: Session = {
            token,
            userUuid,
            expiresAt: new Date(Date.now() + SESSION_TTL_MS)
        }

        db.set<Session>(token, session)

        return session
    }


    export function validate(token: string): Session | undefined {
        console.debug(`server.sessions.Sessions.validate(${token})`)

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
            db.set<Session>(token, session)
        }

        return session
    }


    export function invalidate(token: string) {
        console.debug(`server.sessions.Sessions.invalidate(${token})`)

        db.delete(token)
    }

}


export function getSessionTokenCookie(cookies: Cookies) {
    return cookies.get(SESSION_COOKIE_NAME)
}


export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date): void {
    cookies.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        expires: expiresAt,
        path: "/"
    })
}


export function deleteSessionTokenCookie(cookies: Cookies): void {
    cookies.delete(SESSION_COOKIE_NAME, {path: "/"})
}

