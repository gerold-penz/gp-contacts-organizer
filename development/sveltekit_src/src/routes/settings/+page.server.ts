import { redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"
import { Users } from "$lib/server/users"
import { updateUserAddressBookDefinitions } from "$lib/server/sync"


export const load: ServerLoad = async ({locals}) => {
    if (!locals?.user) {
        return redirect(status.FOUND, "/signin?redirect=/settings")
    }

    const username = locals.user.id!
    await updateUserAddressBookDefinitions(username)


    let userAddressBooks = Users.get(username)?.addressBooks ?? []


    return {
        userAddressBooks,
    }


}
