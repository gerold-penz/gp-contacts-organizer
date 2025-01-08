import type { Handle } from "@sveltejs/kit"
import { Sessions, setSessionTokenCookie, deleteSessionTokenCookie, getSessionTokenCookie } from "$lib/server/sessions"
import { Users } from "$lib/server/users"


export const handle: Handle = async ({event, resolve}) => {
    console.debug("hooks.server.handle()")

    const {cookies, locals} = event

    const sessionToken = getSessionTokenCookie(cookies)

    console.log("sessionToken", sessionToken)

    if (sessionToken) {
        locals.session = Sessions.validate(sessionToken)
    }
    if (locals?.session) {
        locals.user = Users.get(locals.session.userUuid)
    }
    if (locals?.user) {
        locals.user = {...locals.user, passwordHash: undefined}
    }

    if (sessionToken && locals.session && locals.user) {
        setSessionTokenCookie(cookies, sessionToken, locals.session.expiresAt)
    } else {
        event.locals.session = undefined
        event.locals.user = undefined
        deleteSessionTokenCookie(cookies)
    }

    // Finished
    return resolve(event)
}
