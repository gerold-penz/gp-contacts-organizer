import { signOut } from "$lib/server/auth"
import type { Actions } from "./$types"
import { redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"


export const load: ServerLoad = async ({locals}) => {
    const session = locals?.session
    if (!session) {
        return redirect(status.FOUND, "/")
    }
}


export const actions: Actions = {
    default: signOut
}

