import { type Actions, fail, redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"
import { Users } from "$lib/server/users"
import { updateOrInsertVcards, updateUserAddressBookDefinitions } from "$lib/server/sync"
import { z } from "zod"
import { zod } from "sveltekit-superforms/adapters"
import { message, superValidate } from "sveltekit-superforms"
import type { SynchronizationSettings } from "$lib/interfaces"
import { Vcards } from "$lib/server/vcards"


const addressBooksSchema = z.object({
    addressBooks: z.object({
        url: z.string().min(1),
        displayName: z.string().min(1),
        active: z.boolean(),
    }).array()
})

const synchronizationSchema = z.object({
    synchronization: z.object({
        active: z.boolean().optional(),
    })
})

const updateAllContactsSchema = z.object({})


export const load: ServerLoad = async ({locals}) => {
    console.debug(`settings.+page.server.load()`)

    if (!locals?.session) {
        return redirect(status.FOUND, "/signin?redirect=/settings")
    }

    // Get address books
    const username = locals.session?.user?.id!
    let user = Users.get(username)!
    let addressBooks = user.addressBooks || []
    let synchronization = user.synchronization || {active: false}

    // Update the address book definitions for first time
    if (!addressBooks?.length) {
        await updateUserAddressBookDefinitions(username)
        // Load user again
        user = Users.get(username)!
        addressBooks = user.addressBooks || []
        synchronization = user.synchronization || {active: false}
    }

    // Initialize forms
    const addressBooksForm = await superValidate({addressBooks}, zod(addressBooksSchema))
    const synchronizationForm = await superValidate({synchronization}, zod(synchronizationSchema))
    const updateAllVcardsForm = await superValidate(zod(updateAllContactsSchema))

    // Finished
    return {
        addressBooksForm,
        addressBooks,
        synchronizationForm,
        synchronization,
        updateAllVcardsForm
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
        return message(form, "Changes saved")
    },


    updateDefinitions: async ({locals}) => {
        console.debug(`settings.+page.server.updateDefinitions()`)

        // Update the address book definitions
        const username = locals.session?.user?.id!
        await updateUserAddressBookDefinitions(username)

        // Finished
        return true
    },


    saveSynchronization: async ({request, locals}) => {
        console.debug(`settings.+page.server.saveSynchronization()`)

        // Get form data
        const form = await superValidate(request, zod(synchronizationSchema))
        if (!form.valid) {
            return fail(status.BAD_REQUEST, {form})
        }

        // Update settings
        const username = locals.session?.user?.id!
        const user = Users.get(username)!
        user.synchronization = form.data.synchronization as SynchronizationSettings
        Users.set(user)

        // Finished
        return message(form, "Changes saved")
    },


    updateAllVcards: async ({request, locals}) => {
        console.debug(`settings.+page.server.updateAllVcards()`)
        console.time("updateAllVcards()")

        // Get form data
        const form = await superValidate(request, zod(updateAllContactsSchema))
        if (!form.valid) {
            return fail(status.BAD_REQUEST, {form})
        }

        // Get all address books
        const username = locals.session?.user?.id!
        const user = Users.get(username)!
        const addressBooks = user.addressBooks || []

        // Delete all vcards of user from database
        Vcards.deleteAllUserVcards(username)

        // No check --> insert all vcards into database
        for await (const addressBook of addressBooks) {
            if (!addressBook.active) continue
            await updateOrInsertVcards(username, addressBook.url)
        }

        // Log
        console.timeEnd("updateAllVcards()")
    },


}
