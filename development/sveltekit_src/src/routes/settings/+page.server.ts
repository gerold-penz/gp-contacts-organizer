import { redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"
import { getAddressbooks } from "$lib/server/addressbooks"


export const load: ServerLoad = async ({locals}) => {
    if (!locals?.user) {
        return redirect(status.FOUND, "/signin?redirect=/settings")
    }


    await getAddressbooks(locals.user.id!)

}
