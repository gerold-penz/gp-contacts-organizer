import { redirect, type ServerLoad, error } from "@sveltejs/kit"
import type { Session } from "@auth/core/types"
import { status } from "http-status"
import { Users } from "$lib/server/users"
import type { UserAddressBook } from "$lib/interfaces"


export const load: ServerLoad = async ({locals, url}) => {
    const session: Session | undefined = locals?.session || undefined
    if (!session) {
        return redirect(status.FOUND, "/")
    }

    const username = session?.user?.id!
    const user = Users.get(username)
    if (!user) {
        return error(status.NOT_FOUND, "User not found")
    }

    // Get active address books
    const activeAddressBooks: UserAddressBook[] = user?.addressBooks?.filter((addressBook) => addressBook.active) || []


    // Finished
    return {
        session,
        activeAddressBooks
    }









}
