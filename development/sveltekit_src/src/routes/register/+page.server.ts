import type { Actions } from "@sveltejs/kit"
import { zfd } from "zod-form-data"
import { z } from "zod"
import { redirect } from "@sveltejs/kit"
import { status } from "http-status"
import { Users } from "$lib/server/users"
import type { User } from "$lib/interfaces"
import { Sessions, setSessionTokenCookie } from "$lib/server/sessions"
import { Auth } from "$lib/server/auth"


// https://github.com/airjp73/rvf/tree/main/packages/zod-form-data
const schema = zfd.formData({
    username: zfd.text(z.string().min(6).max(255)),
    password: zfd.text(z.string().min(8).max(255)),
})


export const actions: Actions = {

    default: async ({request, locals, cookies}) => {
        console.debug(`auth.Actions.register()`)

        // Check form data
        const formData = await request.formData()
        const {data, error} = schema.safeParse(formData)
        if (error) {
            return {
                username: formData.get("username"),
                password: formData.get("password"),
                fieldErrors: error.flatten().fieldErrors
            }
        }

        // Create user
        const {username, password} = data
        const user = Auth.register(username, password)

        // Create session
        const session = Sessions.create(user.userUuid)

        // Cookie
        setSessionTokenCookie(cookies, session.token, session.expiresAt)

        // Redirect to home page
        return redirect(status.FOUND, "/")

    },

}
