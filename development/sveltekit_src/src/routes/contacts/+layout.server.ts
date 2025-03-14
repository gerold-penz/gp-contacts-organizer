import type { LayoutServerLoad } from "./$types"
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

    // Get address books length
    let allAddressBooksLength = 0
    activeAddressBooks.forEach((addressBook) => {
        addressBook.length = VcardsParsed.getAddressBookLength(username, addressBook.addressBookUrlHash)
        allAddressBooksLength += addressBook.length
    })

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
    const activeVcardsParsed: VcardParsed[] = []
    if (selectedAddressBooks?.length) {
        for (const addressBook of selectedAddressBooks) {
            const vcardsParsed = VcardsParsed.getAllAddressBookVcardsParsed(username, addressBook.addressBookUrlHash) || []
            if (vcardsParsed?.length) {
                activeVcardsParsed.push(...vcardsParsed)
            }

        }
    }

    // Delete the images before they are sent to the browser
    activeVcardsParsed.forEach((activeVcardParsed) => {
        if (activeVcardParsed.vcardParsed.PHOTO?.length) {
            activeVcardParsed.vcardParsed.PHOTO = undefined
        }
    })

    // activeContactGroups
    let activeContactGroups: ContactGroup[] = []

    let categoryNames: {[categoryName: string]: number} = {}

    if (activeVcardsParsed?.length) {
        // Load contact groups of all active address books
        activeVcardsParsed.forEach((activeVcardParsed) => {
            const categories = activeVcardParsed.vcardParsed.CATEGORIES
            if (categories?.[0].value) {
                categories?.[0].value.forEach((categoryName) => {
                    if (categoryName) {
                        categoryNames[categoryName] = (categoryNames[categoryName] ?? 0) + 1
                    }
                })
            }
        })
        // Add contact groups
        Object.entries(categoryNames).forEach(([displayName, length]) => {
            activeContactGroups.push({displayName, length})
        })
        // Sort
        activeContactGroups.sort((a, b) => {
            if (a.displayName > b.displayName) return 1
            if (a.displayName < b.displayName) return -1
            return 0
        })
    }


    // Finished
    return {
        activeAddressBooks,
        selectedAddressBooks,
        activeVcardsParsed,
        activeContactGroups,
        allAddressBooksLength
    }

}
