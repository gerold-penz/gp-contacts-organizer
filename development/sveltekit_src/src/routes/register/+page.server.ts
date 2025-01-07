import type { Actions } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"
import { status } from "http-status"


export const actions: Actions = {


    default: async ({request}) => {
        console.debug(`auth.Actions.register()`)

        const formData = await request.formData()


        console.table(formData)





        // return redirect(status.FOUND, "/")

    },

}
