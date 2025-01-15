import { redirect, type ServerLoad } from "@sveltejs/kit"
import type { Session } from "@auth/core/types"
import { status } from "http-status"
import { Nextcloud } from "$lib/server/nextcloud"


export const load: ServerLoad = async ({locals}) => {
    const session: Session | undefined = locals?.session || undefined
    if (!session) {
        return redirect(status.FOUND, "/")
    }

    const username = session?.user?.id!
    const vcards = await Nextcloud.getAllVcards(username, "https://next.gerold-penz.at/remote.php/dav/addressbooks/users/gerold/kontakte/")



}
