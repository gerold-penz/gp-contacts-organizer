import { signIn } from "../../lib/server/auth"
import type { Actions } from "./$types"
import { redirect, type ServerLoad } from "@sveltejs/kit"
import type { User } from "@auth/core/types"
import { status } from "http-status"


export const load: ServerLoad = async ({locals, url}) => {
    const user: User | undefined = locals?.user || undefined
    if (user) {
        return redirect(status.FOUND, url.searchParams.get("redirect") || "/")
    }
}


export const actions: Actions = {
    default: signIn
}

