import type { ServerLoad } from "@sveltejs/kit"
import { fail, redirect } from "@sveltejs/kit"
import { status } from "http-status"
import { deleteSessionTokenCookie, Sessions } from "$lib/server/sessions"


export const load: ServerLoad = async ({locals, cookies}) => {
    const session = locals.session
    if (!session) {
        return fail(status.UNAUTHORIZED)
    }
    // Logout
    Sessions.invalidate(session.token)
    deleteSessionTokenCookie(cookies)
    locals.session = undefined
    locals.user = undefined
}

