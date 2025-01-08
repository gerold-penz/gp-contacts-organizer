import { redirect, type ServerLoad } from "@sveltejs/kit"
import {status} from "http-status"


export const load: ServerLoad = async ({locals}) => {
    if (!locals?.session) {
        return redirect(status.FOUND, "/login?redirect=/settings")
    }
}

