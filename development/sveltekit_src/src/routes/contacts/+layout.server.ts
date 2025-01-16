import type {LayoutServerLoad} from "./$types"
import { redirect, error } from "@sveltejs/kit"
import { status } from "http-status"
import { Users } from "$lib/server/users"
import type { ContactGroup, UserAddressBook } from "$lib/interfaces"


export const load: LayoutServerLoad = async ({locals, params}) => {

    // Get session
    const session = locals?.session
    if (!session) {
        return redirect(status.FOUND, "/")
    }

    // Get user
    const username = session?.user?.id!
    const user = Users.get(username)
    if (!user) {
        return error(status.NOT_FOUND, "User not found")
    }

    // Get active address books
    const activeAddressBooks: UserAddressBook[] = user?.addressBooks?.filter((addressBook) => addressBook.active) || []

    // Get selected address book
    let activeContactGroups: ContactGroup[] = []
    if (
        params?.addressBookId === "all" ||
        Number(params?.addressBookId) >= 0
    ) {
        // ToDo: Load contact groups of all active address books
        activeContactGroups = [{displayName: "Family"}, {displayName: "Customers"}, {displayName: "Starred in Android"}]
    }

    // Finished
    return {
        activeAddressBooks,
        activeContactGroups,
    }









}
