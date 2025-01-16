import { redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"


export const load: ServerLoad = async ({locals}) => {
    const session = locals?.session
    if (session) {
        return redirect(status.FOUND, "/contacts")
    }
}
