import type { Actions } from "@sveltejs/kit"


export const actions: Actions = {


    default: async ({request}) => {
        console.debug(`auth.Actions.login()`)

        const formData = await request.formData()

    },

}
