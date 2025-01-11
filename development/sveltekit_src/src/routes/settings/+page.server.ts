import { redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"
import { getAddressBooks } from "$lib/server/carddav"
import { Users } from "$lib/server/users"


export const load: ServerLoad = async ({locals}) => {
    if (!locals?.user) {
        return redirect(status.FOUND, "/signin?redirect=/settings")
    }

    const username = locals.user.id!
    let userAddressBooks = Users.get(username)?.addressBooks ?? []
    const webAddressBooks = (await getAddressBooks(username)) ?? []


    webAddressBooks.forEach((webAddressBook) => {

        // Push webAddressBook to userAddressBooks if not exists
        const found = Boolean(userAddressBooks.find((userAddressBook) => {
            return webAddressBook.url === userAddressBook.url
        }))
        if (!found) {
            userAddressBooks.push({...webAddressBook, active: true})
        }

        // Update display name
        const userAddressBook = userAddressBooks.find((userAddressBook) => userAddressBook.url === webAddressBook.url)
        if (userAddressBook) {
            userAddressBook.displayName = webAddressBook.displayName
        }

    })

    // Delete userAdressBook if not in webAddressBooks
    const urlsToDelete = new Set<string>()
    for (const userAddressBook of userAddressBooks) {
        const found = Boolean(webAddressBooks.find((webAddressBook) => webAddressBook.url === userAddressBook.url))
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
        webAddressBooks,
    }


}
