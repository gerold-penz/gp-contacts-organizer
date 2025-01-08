import type { Actions, ServerLoad } from "@sveltejs/kit"
import {fail} from "@sveltejs/kit"
import { superValidate, message } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import { z } from "zod"
import { redirect } from "@sveltejs/kit"
import { status } from "http-status"
import { Sessions, setSessionTokenCookie } from "$lib/server/sessions"
import { Auth } from "$lib/server/auth"
import type { User } from "$lib/interfaces"


const schema = z.object({
    username: z.string().min(6).max(255),
    password: z.string().min(8).max(255),
})


export const load: ServerLoad = async ({request}) => {
    const form = await superValidate(zod(schema))
    return {form}
}


export const actions: Actions = {

    default: async ({request, cookies, locals}) => {
        console.debug(`auth.Actions.register()`)

        // Get form data
        const form = await superValidate(request, zod(schema));
        if (!form.valid) {
            return fail(status.BAD_REQUEST, {form})
        }

        // Create user
        let user: User
        try {
            user = Auth.register(form.data.username, form.data.password)
        } catch (error) {
            if (String(error).includes(Auth.USERNAME_EXISTS_ERROR)) {
                return message(form, "Username already exists.", {status: status.BAD_REQUEST})
            } else if (String(error).includes(Auth.INVALID_USERNAME_ERROR)) {
                return message(form, "Invalid username.", {status: status.BAD_REQUEST})
            } else if (String(error).includes(Auth.INVALID_PASSWORD_ERROR)) {
                return message(form, "Invalid password.", {status: status.BAD_REQUEST})
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
