import type {LayoutServerLoad} from "./$types"
import { redirect, error } from "@sveltejs/kit"
import { status } from "http-status"
import { Users } from "$lib/server/users"
import type { ContactGroup, Hash, UserAddressBook, VcardParsed } from "$lib/interfaces"
import { VcardsParsed } from "$lib/server/vcardsParsed"


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
        return redirect(status.FOUND, "/signout")
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

    // Get all parsed vCards of the selected address books (async)
    console.time("load active vcards parsed")
    const activeVcardsParsed: VcardParsed[] = []
    if (selectedAddressBooks?.length) {
        for (const addressBook of selectedAddressBooks) {
            const vcardParseds = VcardsParsed.getAllAddressBookVcardsParsed(username, addressBook.addressBookUrlHash) || []
            if (vcardParseds?.length) {
                activeVcardsParsed.push(...vcardParseds)
            }
        }
    }
    console.timeEnd("load active vcards parsed")


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
        activeVcardsParsed,
        activeContactGroups,
    }

}
