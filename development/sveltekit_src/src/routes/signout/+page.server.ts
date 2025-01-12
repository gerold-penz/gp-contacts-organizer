import { signOut } from "$lib/server/auth"
import type { Actions } from "./$types"
import { redirect, type ServerLoad } from "@sveltejs/kit"
import type { Session } from "@auth/core/types"
import { status } from "http-status"


export const load: ServerLoad = async ({locals}) => {
    const session: Session | undefined = locals?.session || undefined
    if (!session) {
        return redirect(status.FOUND, "/")
    }
}


export const actions: Actions = {
    default: signOut
}

