import { type Actions, fail, redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"
import { z } from "zod"
import { message, superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import { Users } from "$lib/server/users"


const changeUsernameSchema = z.object({
    username: z.string().min(6).max(255),
})
const changePasswordSchema = z.object({
    password: z.string().min(8).max(255),
})



export const load: ServerLoad = async ({locals}) => {
    if (!locals?.session) {
        return redirect(status.FOUND, "/login?redirect=/settings")
    }

    const changeUsernameForm = await superValidate(zod(changeUsernameSchema), {
        defaults: {
            username: locals.user?.username || undefined
        }
    })
    const changePasswordForm = await superValidate(zod(changePasswordSchema))

    return {
        changeUsernameForm,
        changePasswordForm,
    }

}


export const actions: Actions = {


    changeUsername:  async ({request, cookies, locals, url}) => {
        console.debug(`settings.Actions.changeUsername()`)

        // Get form data
        const changeUsernameForm = await superValidate(request, zod(changeUsernameSchema))
        if (!changeUsernameForm.valid) {
            return fail(status.BAD_REQUEST, {changeUsernameForm})
        }

        // Change username
        // try {
        //     const newUser = Users.changeUsername(locals.user?.uuid!, changeUsernameForm.data.username)
        // } catch (error) {
        //     return message(changeUsernameForm, "xxx", {status: status.NOT_FOUND})
        // }
    },


}


