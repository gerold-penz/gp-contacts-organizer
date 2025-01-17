import type {LayoutServerLoad} from "./$types"
import { redirect, error } from "@sveltejs/kit"
import { status } from "http-status"
import { Users } from "$lib/server/users"
import type { ContactGroup, Hash, UserAddressBook, Vcard } from "$lib/interfaces"
import { Vcards } from "$lib/server/vcards"


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

    // Get selected address book(s)
    let selectedAddressBooks: UserAddressBook[] | undefined = undefined
    const addressBookUrlHash = params?.addressBookUrlHash
    if (addressBookUrlHash && addressBookUrlHash === "all") {
        selectedAddressBooks = activeAddressBooks
    } else if (addressBookUrlHash) {
        const hash: Hash = BigInt(addressBookUrlHash)
        selectedAddressBooks = activeAddressBooks.filter((addressBook) => addressBook.addressBookUrlHash === hash)
    }

    // Get all vCards of the selected address books (async)
    console.time("load active vcards")
    const activeVcards: Vcard[] = []
    if (selectedAddressBooks?.length) {
        for (const addressBook of selectedAddressBooks) {
            const vcards = Vcards.getAllAddressBookVcards(username, addressBook.addressBookUrlHash) || []
            if (vcards?.length) {
                activeVcards.push(...vcards)
            }
        }
    }
    console.timeEnd("load active vcards")


    // activeContactGroups
    let activeContactGroups: ContactGroup[] = []
    if (selectedAddressBooks?.length) {

        // ToDo: Load contact groups of all active address books
        activeContactGroups = [{displayName: "Family"}, {displayName: "Customers"}, {displayName: "Starred in Android"}]

    }

    // Finished
    return {
        activeAddressBooks,
        selectedAddressBooks,
        activeVcards,
        activeContactGroups,
    }

}
