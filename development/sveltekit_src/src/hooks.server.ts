import type { Handle } from "@sveltejs/kit";
import { Sessions, setSessionTokenCookie, deleteSessionTokenCookie, getSessionTokenCookie } from "$lib/server/sessions"
import { Users } from "$lib/server/users"


export const handle: Handle = async ({event, resolve}) => {
    console.debug("hooks.server.handle()")

    const sessionToken = getSessionTokenCookie(event)
    if (sessionToken) {
        event.locals.session = Sessions.validate(sessionToken)
        event.locals.user = Users.get(event.locals.session?.userUuid)
    }

    if (
        sessionToken &&
        event.locals.session &&
        event.locals.user
    ) {
        setSessionTokenCookie(event, sessionToken, event.locals.session.expiresAt)
    } else {
        deleteSessionTokenCookie(event)
    }

    // Finished
    return resolve(event)

}
