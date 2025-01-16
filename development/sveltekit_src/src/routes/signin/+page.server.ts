import { signIn } from "$lib/server/auth"
import type { Actions } from "./$types"
import { redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"


export const load: ServerLoad = async ({locals, url}) => {
    const session = locals?.session
    if (session) {
        return redirect(status.FOUND, url.searchParams.get("redirect") || "/")
    }
}


export const actions: Actions = {
    default: signIn
}

