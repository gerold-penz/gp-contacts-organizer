import { redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"
import { Nextcloud } from "$lib/server/nextcloud"
import { Users } from "$lib/server/users"


export const load: ServerLoad = async ({locals}) => {
    if (!locals?.user) {
        return redirect(status.FOUND, "/signin?redirect=/settings")
    }

    const username = locals.user.id!
    let userAddressBooks = Users.get(username)?.addressBooks ?? []
    const ncAddressBooks = (await Nextcloud.getAddressBooks(username)) ?? []


    ncAddressBooks.forEach((ncAddressBook) => {

        // Push webAddressBook to userAddressBooks if not exists
        const found = Boolean(userAddressBooks.find((userAddressBook) => {
            return ncAddressBook.url === userAddressBook.url
        }))
        if (!found) {
            userAddressBooks.push({
                url: ncAddressBook.url,
                displayName: ncAddressBook.displayName,
                active: true
            })
        }

        // Update display name
        const userAddressBook = userAddressBooks.find((userAddressBook) => userAddressBook.url === ncAddressBook.url)
        if (userAddressBook) {
            userAddressBook.displayName = ncAddressBook.displayName
        }

    })

    // Delete userAdressBook if not in ncAddressBooks
    const urlsToDelete = new Set<string>()
    for (const userAddressBook of userAddressBooks) {
        const found = Boolean(ncAddressBooks.find((ncAddressBook) => ncAddressBook.url === userAddressBook.url))
        if (!found) {
            urlsToDelete.add(userAddressBook.url)
        }
    }
    if (urlsToDelete.size) {
        userAddressBooks = userAddressBooks.filter((userAddressBook) => !urlsToDelete.has(userAddressBook.url) )
    }

    // Speichern
    const user = Users.get(username)!
    user.addressBooks = userAddressBooks
    Users.set(user)

    return {
        userAddressBooks,
        webAddressBooks: ncAddressBooks,
    }


}
