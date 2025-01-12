import { redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"
import { Users } from "$lib/server/users"
import { updateUserAddressBookDefinitions } from "$lib/server/sync"
import type { User } from "$lib/interfaces"


export const load: ServerLoad = async ({locals}) => {
    if (!locals?.session) {
        return redirect(status.FOUND, "/signin?redirect=/settings")
    }

    // Update the address book definitions
    const username = locals.session?.user?.id!
    await updateUserAddressBookDefinitions(username)


    return {
        user: Users.get(username) as User
    }
}
