import type { Actions } from "@sveltejs/kit"
import { fail, redirect } from "@sveltejs/kit"
import { status } from "http-status"
import { deleteSessionTokenCookie, Sessions } from "$lib/server/sessions"


export const actions: Actions = {


    // action="?/logout"
    logout: async ({locals, cookies}) => {
        console.debug(`auth.Actions.logout()`)

        const session = locals.session
        if (!session) {
            return fail(status.UNAUTHORIZED)
        }

        // Logout
        Sessions.invalidate(session.token)
        deleteSessionTokenCookie(cookies)
        locals.session = undefined
        locals.user = undefined

        // Go to start page
        return redirect(status.FOUND, "/")
    },


}
