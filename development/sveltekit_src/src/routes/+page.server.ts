import { error, redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"
import { Users } from "$lib/server/users"
import { updateUserAddressBookDefinitions } from "$lib/server/sync"


export const load: ServerLoad = async ({locals}) => {
    const session = locals?.session
    if (session) {

        // Check if address books loaded
        const username = session?.user?.id!
        const user = Users.get(username)
        if (!user) {
            return error(status.NOT_FOUND, "User not found")
        }
        if (!user?.addressBooks?.length) {
            await updateUserAddressBookDefinitions(username)
        }
        // Redirect
        return redirect(status.FOUND, "/contacts")
    }
}
