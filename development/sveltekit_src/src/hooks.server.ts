import type { Handle } from "@sveltejs/kit";
import { SESSION_COOKIE_NAME } from "$lib/constants"
import { Sessions, setSessionTokenCookie, deleteSessionTokenCookie } from "$lib/server/sessions"
import { Users } from "$lib/server/users"


export const handle: Handle = async ({event, resolve}) => {
    const sessionToken = event.cookies.get(SESSION_COOKIE_NAME)

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

