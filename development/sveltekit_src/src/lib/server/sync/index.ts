import type { Hash, User, Username } from "$lib/interfaces"
import { Users } from "$lib/server/users"
import { Nextcloud } from "$lib/server/nextcloud"
import { Vcards } from "$lib/server/vcards"
import { VcardsParsed } from "$lib/server/vcardsParsed"


export const USER_NOT_FOUND_ERROR = "[USER NOT FOUND ERROR]"


/**
 * Update the user's address book definitions.
 * @param {Username} username
 */
export async function updateUserAddressBookDefinitions(username: Username) {
    console.debug(`sync.updateUserAddressBookDefinitions(${username})`)

    let user: User = Users.get(username)!
    if (!user) throw new Error(USER_NOT_FOUND_ERROR)

    let userAddressBooks = user?.addressBooks ?? []
    const ncAddressBooks = (await Nextcloud.getAddressBooks(username)) ?? []

    ncAddressBooks.forEach((ncAddressBook) => {

        // Don't sync system address books
        // /z-server-generated--system/
        // /z-app-generated--contactsinteraction--recent/
        if (
            ncAddressBook.url.includes("z-server-generated") ||
            ncAddressBook.url.includes("z-app-generated")
        ) {
            return
        }

        // Push webAddressBook to userAddressBooks if not exists
        const found = Boolean(userAddressBooks.find((userAddressBook) => {
            return ncAddressBook.url === userAddressBook.url
        }))
        if (!found) {
            userAddressBooks.push({
                addressBookUrlHash: Bun.hash(ncAddressBook.url),
                url: ncAddressBook.url,
                displayName: ncAddressBook.displayName,
                active: true
            })
        }

        // Update display name
        const userAddressBook = userAddressBooks.find((userAddressBook) => {
            return userAddressBook.url === ncAddressBook.url
        })
        if (userAddressBook) {
            userAddressBook.displayName = ncAddressBook.displayName
        }

    })

    // Delete userAdressBook if not in ncAddressBooks
    if (userAddressBooks?.length) {
        userAddressBooks = userAddressBooks.filter((userAddressBook) => {
            return ncAddressBooks.find((ncAddressBook) => {
                return ncAddressBook.url === userAddressBook.url
            })
        })
    }

    // Speichern
    user = Users.get(username)!
    user.addressBooks = userAddressBooks
    Users.set(user)

}


export async function updateOrInsertVcards(username: Username, addressBookUrl: string) {
    console.debug(`sync.updateOrInsertVcards(${username}, ${addressBookUrl})`)

    const vcards = await Nextcloud.getAllVcards(username, addressBookUrl)
    if (!vcards) return

    // Insert or update all vCards into the database
    Vcards.batchSet(username, vcards)
}


export function updateOrInsertParsedVcards(username: Username, addressBookUrlHash: Hash) {
    console.debug(`sync.updateOrInsertParsedVcards(${username}, ${addressBookUrlHash})`)

    const vcards = Vcards.getAllAddressBookVcards(username, addressBookUrlHash)
    if (!vcards) return

    // Parse all native vCards and insert or update all of them into the database
    VcardsParsed.batchParseVcardsAndSet(username, vcards)
}
