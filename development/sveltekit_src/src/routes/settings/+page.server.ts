import { type Actions, fail, redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"
import { Users } from "$lib/server/users"
import { updateUserAddressBookDefinitions } from "$lib/server/sync"
import { z } from "zod"
import { zod } from "sveltekit-superforms/adapters"
import { message, superValidate } from "sveltekit-superforms"


const addressBooksSchema = z.object({
    addressBooks: z.object({
        path: z.string().min(1),
        displayName: z.string().min(1),
        active: z.boolean(),
    }).array()
})


export const load: ServerLoad = async ({locals}) => {
    console.debug(`settings.+page.server.load()`)

    if (!locals?.session) {
        return redirect(status.FOUND, "/signin?redirect=/settings")
    }

    // Get address books
    const username = locals.session?.user?.id!
    let addressBooks = Users.get(username)?.addressBooks ?? []

    // Update the address book definitions for first time
    if (!addressBooks?.length) {
        await updateUserAddressBookDefinitions(username)
        addressBooks = Users.get(username)?.addressBooks ?? []
    }

    // Initialize address books form
    const addressBooksForm = await superValidate({addressBooks}, zod(addressBooksSchema))

    // Finished
    return {
        addressBooksForm,
        addressBooks,
    }

}


export const actions: Actions = {


    saveAddressBooks: async ({request, locals}) => {
        console.debug(`settings.+page.server.saveAddressBooks()`)

        // Get form data
        const form = await superValidate(request, zod(addressBooksSchema))
        if (!form.valid) {
            return fail(status.BAD_REQUEST, {form})
        }

        // Update address books
        const username = locals.session?.user?.id!
        const user = Users.get(username)!
        user.addressBooks = form.data.addressBooks
        Users.set(user)

        // Finished
        return message(form, "Address books saved")

    },


    updateDefinitions: async ({request, locals}) => {
        console.debug(`settings.+page.server.updateDefinitions()`)

        // Update the address book definitions
        const username = locals.session?.user?.id!
        await updateUserAddressBookDefinitions(username)

        // Finished
        return true

    },

}
