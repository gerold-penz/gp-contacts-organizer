import { redirect, type ServerLoad } from "@sveltejs/kit"
import { status } from "http-status"


export const load: ServerLoad = async ({locals}) => {
    if (!locals?.user) {
        return redirect(status.FOUND, "/signin?redirect=/settings")
    }
}
