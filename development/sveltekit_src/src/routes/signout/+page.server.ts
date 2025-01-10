import { signOut } from "$lib/auth"
import type { Actions } from "./$types"
import { redirect, type ServerLoad } from "@sveltejs/kit"
import type { User } from "@auth/core/types"
import { status } from "http-status"


export const load: ServerLoad = async ({locals}) => {
    const user: User | undefined = locals?.user || undefined
    if (!user) {
        return redirect(status.FOUND, "/")
    }
}


export const actions: Actions = {
    default: signOut
}
