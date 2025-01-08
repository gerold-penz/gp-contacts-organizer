import { type Actions, fail, redirect, type ServerLoad } from "@sveltejs/kit"
import { z } from "zod"
import { message, superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import { status } from "http-status"
import type { User } from "$lib/interfaces"
import { Auth } from "$lib/server/auth"
import { Sessions, setSessionTokenCookie } from "$lib/server/sessions"


const schema = z.object({
    username: z.string().min(6).max(255),
    password: z.string().min(8).max(255),
})


export const load: ServerLoad = async ({request}) => {
    const form = await superValidate(zod(schema))
    return {form}
}


export const actions: Actions = {


    default: async ({request, cookies}) => {
        console.debug(`auth.Actions.login()`)

        // Get form data
        const form = await superValidate(request, zod(schema));
        if (!form.valid) {
            return fail(status.BAD_REQUEST, {form})
        }

        // Log in
        let user: User
        try {
            user = Auth.login(form.data.username, form.data.password)
        } catch (error) {
            if (
                String(error).includes(Auth.USERNAME_NOT_EXISTS_ERROR) ||
                String(error).includes(Auth.INVALID_PASSWORD_ERROR)
            ) {
                return message(form, "Username or password incorrect.", {status: status.BAD_REQUEST})
            } else {
                return message(form, String(error), {status: status.BAD_REQUEST})
            }
        }

        // Create session and session cookie
        const session = Sessions.create(user.userUuid)
        setSessionTokenCookie(cookies, session.token, session.expiresAt)

        // Redirect to home page
        return redirect(status.FOUND, "/")

    },

}
