import { type Actions, fail, redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"
import { Users } from "$lib/server/users"
import { updateUserAddressBookDefinitions } from "$lib/server/sync"
import { z } from "zod"
import { zod } from "sveltekit-superforms/adapters"
import type { UserAddressBook } from "$lib/interfaces"


const schema = z.object({
    addressBooks: z.object({
        path: z.string().min(1),
        displayName: z.string().min(1),
        active: z.boolean(),
    }).array()
})


export const load: ServerLoad = async ({locals}) => {
    console.debug(`settings.+page.server.load()`)

    if (!locals?.session) {
        return redirect(status.FOUND, "/signin?redirect=/settings")
    }

    // Update the address book definitions
    const username = locals.session?.user?.id!
    await updateUserAddressBookDefinitions(username)

    // Get address books
    const addressBooks = Users.get(username)?.addressBooks ?? []

    return {
        addressBooks
    }

}
