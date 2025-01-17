import { redirect, type ServerLoad } from "@sveltejs/kit"
import type { Session } from "@auth/core/types"
import { status } from "http-status"


export const load: ServerLoad = async ({locals, parent}) => {
    console.debug(`--- /contacts/[addressBookUrlHash]/+page.server.ts load() ---`)

    const session: Session | undefined = locals?.session || undefined
    if (!session) {
        return redirect(status.FOUND, "/")
    }

    return {
        ...await parent()
    }
}
